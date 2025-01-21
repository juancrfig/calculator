// script.js

/**
 * MAJOR IMPROVEMENTS OVER ORIGINAL CODE:
 * 1. Organized code using ES6 classes and modules
 * 2. Implemented proper state management
 * 3. Separated concerns (display, calculation, event handling)
 * 4. Added proper error handling and user feedback
 * 5. Improved code readability and maintainability
 * 6. Added thorough documentation
 */

/**
 * Calculator class to handle the core calculator functionality
 * IMPROVEMENT: Previously, the state was managed through global variables,
 * which made it hard to track changes and led to bugs. Using a class
 * encapsulates the state and related methods.
 */
class Calculator {
    constructor() {
        // Initialize calculator state
        this.reset();
        
        // Cache DOM elements for better performance
        // IMPROVEMENT: Original code queried DOM multiple times
        this.previousOperandElement = document.querySelector('.previous-operand');
        this.currentOperandElement = document.querySelector('.current-operand');
        
        // Bind event handlers
        this.handleNumber = this.handleNumber.bind(this);
        this.handleOperator = this.handleOperator.bind(this);
        this.handleEquals = this.handleEquals.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleKeyboard = this.handleKeyboard.bind(this);
        
        this.setupEventListeners();
    }
    
    /**
     * Reset calculator state
     * IMPROVEMENT: Centralized state management instead of scattered variables
     */
    reset() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
    }
    
    /**
     * Setup all event listeners
     * IMPROVEMENT: Centralized event handling instead of scattered listeners
     */
    setupEventListeners() {
        document.querySelectorAll('[data-number]')
            .forEach(button => button.addEventListener('click', () => 
                this.handleNumber(button.dataset.number)));
                
        document.querySelectorAll('[data-operator]')
            .forEach(button => button.addEventListener('click', () => 
                this.handleOperator(button.dataset.operator)));
                
        document.querySelector('.equals')
            .addEventListener('click', this.handleEquals);
            
        document.querySelector('.delete-btn')
            .addEventListener('click', this.handleDelete);
            
        document.querySelector('.clear-btn')
            .addEventListener('click', this.handleClear);
            
        document.addEventListener('keydown', this.handleKeyboard);
    }
    
    /**
     * Handle number input
     * IMPROVEMENT: Better input validation and handling of edge cases
     */
    handleNumber(number) {
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }
        
        // Validate decimal point
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        // Prevent leading zeros
        if (number === '0' && this.currentOperand === '0') return;
        
        // Replace leading zero
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
        
        this.updateDisplay();
    }
    
    /**
     * Handle operator input
     * IMPROVEMENT: Clearer operator handling logic and state management
     */
    handleOperator(operator) {
        if (this.currentOperand === '') return;
        
        if (this.previousOperand !== '') {
            this.calculate();
        }
        
        this.operation = operator;
        this.previousOperand = this.currentOperand;
        this.shouldResetScreen = true;
        this.updateDisplay();
    }
    
    /**
     * Calculate result
     * IMPROVEMENT: More robust calculation logic with error handling
     */
    calculate() {
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        try {
            switch (this.operation) {
                case '+':
                    this.currentOperand = (prev + current).toString();
                    break;
                case '-':
                    this.currentOperand = (prev - current).toString();
                    break;
                case '*':
                    this.currentOperand = (prev * current).toString();
                    break;
                case '/':
                    if (current === 0) {
                        throw new Error('Cannot divide by zero');
                    }
                    this.currentOperand = (prev / current).toString();
                    break;
                default:
                    return;
            }
        } catch (error) {
            this.showError(error.message);
            this.reset();
            return;
        }
        
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetScreen = true;
    }
    
    /**
     * Handle equals button
     * IMPROVEMENT: Separated equals logic from general operation handling
     */
    handleEquals() {
        if (!this.operation || !this.previousOperand) return;
        this.calculate();
        this.updateDisplay();
    }
    
    /**
     * Handle delete button
     * IMPROVEMENT: More intuitive deletion behavior
     */
    handleDelete() {
        if (this.shouldResetScreen) return;
        this.currentOperand = this.currentOperand.slice(0, -1) || '0';
        this.updateDisplay();
    }
    
    /**
     * Handle clear button
     */
    handleClear() {
        this.reset();
        this.updateDisplay();
    }
    
    /**
     * Handle keyboard input
     * IMPROVEMENT: More comprehensive keyboard support with better mapping
     */
    handleKeyboard(event) {
        // Prevent default browser shortcuts
        if (event.key === '/' || event.key === '*') {
            event.preventDefault();
        }
        
        if (/^\d$/.test(event.key)) this.handleNumber(event.key);
        if (event.key === '.') this.handleNumber('.');
        if (event.key === 'Backspace') this.handleDelete();
        if (event.key === 'Escape') this.handleClear();
        if (event.key === 'Enter' || event.key === '=') this.handleEquals();
        if (['+', '-', '*', '/'].includes(event.key)) this.handleOperator(event.key);
    }
    
    /**
     * Update display elements
     * IMPROVEMENT: Centralized display updating with proper formatting
     */
    updateDisplay() {
        this.currentOperandElement.textContent = this.formatDisplay(this.currentOperand);
        if (this.operation) {
            this.previousOperandElement.textContent = 
                `${this.formatDisplay(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.textContent = '';
        }
    }
    
    /**
     * Format display value
     * IMPROVEMENT: Added proper number formatting
     */
    formatDisplay(number) {
        const stringNumber = number.toString();
        const [integerDigits, decimalDigits] = stringNumber.split('.');
        const formattedInteger = parseInt(integerDigits).toLocaleString();
        
        if (decimalDigits != null) {
            return `${formattedInteger}.${decimalDigits}`;
        }
        return formattedInteger;
    }
    
    /**
     * Show error message to user
     * IMPROVEMENT: Added proper error feedback instead of console.log
     */
    showError(message) {
        this.currentOperandElement.textContent = message;
        setTimeout(() => this.updateDisplay(), 2000);
    }
}

// Initialize calculator
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});