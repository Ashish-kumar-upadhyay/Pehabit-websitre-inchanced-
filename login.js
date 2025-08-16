// Enhanced Login Page JavaScript - More Eye-catching Features
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.querySelector('.login-btn');
    const loginContainer = document.querySelector('.login-container');

    // Enhanced Password Toggle with Animation
    window.togglePassword = function() {
        const passwordInput = document.getElementById('password');
        const toggleBtn = document.querySelector('.toggle-password i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleBtn.classList.remove('fa-eye');
            toggleBtn.classList.add('fa-eye-slash');
            
            // Add success animation
            toggleBtn.style.color = '#28a745';
            toggleBtn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                toggleBtn.style.transform = 'scale(1)';
            }, 200);
        } else {
            passwordInput.type = 'password';
            toggleBtn.classList.remove('fa-eye-slash');
            toggleBtn.classList.add('fa-eye');
            
            // Add animation
            toggleBtn.style.color = '#666';
            toggleBtn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                toggleBtn.style.transform = 'scale(1)';
            }, 200);
        }
    };

    // Enhanced Form Validation with Better UX
    function validateForm() {
        let isValid = true;
        
        // Reset previous error states
        clearErrors();
        
        // Username validation with enhanced feedback
        if (!usernameInput.value.trim()) {
            showError(usernameInput, 'Username is required');
            isValid = false;
            shakeElement(usernameInput);
        } else if (usernameInput.value.trim().length < 3) {
            showError(usernameInput, 'Username must be at least 3 characters');
            isValid = false;
            shakeElement(usernameInput);
        } else {
            showSuccess(usernameInput);
        }
        
        // Password validation with enhanced feedback
        if (!passwordInput.value.trim()) {
            showError(passwordInput, 'Password is required');
            isValid = false;
            shakeElement(passwordInput);
        } else if (passwordInput.value.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters');
            isValid = false;
            shakeElement(passwordInput);
        } else {
            showSuccess(passwordInput);
        }
        
        return isValid;
    }

    // Enhanced Error Display with Animation
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        
        // Remove existing error message if any
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create and add error message with animation
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        errorMessage.style.opacity = '0';
        errorMessage.style.transform = 'translateY(-10px)';
        formGroup.appendChild(errorMessage);
        
        // Animate error message in
        setTimeout(() => {
            errorMessage.style.transition = 'all 0.3s ease';
            errorMessage.style.opacity = '1';
            errorMessage.style.transform = 'translateY(0)';
        }, 10);
    }

    // Show Success State
    function showSuccess(input) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        
        // Remove error message if exists
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        
        // Add success checkmark
        if (!formGroup.querySelector('.success-check')) {
            const successCheck = document.createElement('div');
            successCheck.className = 'success-check';
            successCheck.innerHTML = '<i class="fas fa-check"></i>';
            successCheck.style.cssText = `
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                color: #28a745;
                font-size: 18px;
                opacity: 0;
                animation: successCheckIn 0.5s ease forwards;
            `;
            formGroup.appendChild(successCheck);
        }
    }

    // Add CSS for success check animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes successCheckIn {
            from {
                opacity: 0;
                transform: translateY(-50%) scale(0);
            }
            to {
                opacity: 1;
                transform: translateY(-50%) scale(1);
            }
        }
    `;
    document.head.appendChild(style);

    // Shake Animation for Errors
    function shakeElement(element) {
        element.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }

    // Clear all errors with animation
    function clearErrors() {
        const errorGroups = document.querySelectorAll('.form-group.error');
        errorGroups.forEach(group => {
            group.classList.remove('error');
            const errorMessage = group.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.style.transition = 'all 0.3s ease';
                errorMessage.style.opacity = '0';
                errorMessage.style.transform = 'translateY(-10px)';
                setTimeout(() => errorMessage.remove(), 300);
            }
        });
        
        // Remove success states
        const successGroups = document.querySelectorAll('.form-group.success');
        successGroups.forEach(group => {
            group.classList.remove('success');
            const successCheck = group.querySelector('.success-check');
            if (successCheck) {
                successCheck.remove();
            }
        });
    }

    // Enhanced Success Message with Better Animation
    function showMessage(message, type = 'success') {
        // Remove existing messages
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.style.transition = 'all 0.3s ease';
            existingMessage.style.opacity = '0';
            existingMessage.style.transform = 'translateY(-20px)';
            setTimeout(() => existingMessage.remove(), 300);
        }
        
        // Create message element with enhanced styling
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}" 
                   style="font-size: 18px;"></i>
                <span>${message}</span>
            </div>
        `;
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(-20px)';
        
        // Insert message before the form
        const form = document.querySelector('.login-form');
        form.insertBefore(messageDiv, form.firstChild);
        
        // Animate message in
        setTimeout(() => {
            messageDiv.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 10);
        
        // Auto remove message after 5 seconds with animation
        setTimeout(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 300);
        }, 5000);
    }

    // Enhanced Form Submission with Better UX
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show loading state with enhanced animation
            loginBtn.classList.add('loading');
            loginBtn.innerHTML = '<i class="fas fa-spinner"></i> Signing In...';
            loginBtn.disabled = true;
            
            // Add pulse effect to container
            loginContainer.style.animation = 'containerPulse 2s ease-in-out';
            
            // Simulate API call (replace with actual authentication)
            setTimeout(() => {
                // Simulate successful login
                showMessage('🎉 Login successful! Redirecting...', 'success');
                
                // Add success animation to container
                loginContainer.style.animation = 'successBounce 0.6s ease-out';
                
                // Reset form
                loginForm.reset();
                
                // Simulate redirect after 2 seconds
                setTimeout(() => {
                    showMessage('🚀 Welcome to PEHABIT! You are now logged in.', 'success');
                }, 2000);
                
                // Reset button state
                loginBtn.classList.remove('loading');
                loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
                loginBtn.disabled = false;
                
                // Reset container animation
                setTimeout(() => {
                    loginContainer.style.animation = '';
                }, 600);
            }, 2000);
        }
    });

    // Add CSS for new animations
    const additionalStyle = document.createElement('style');
    additionalStyle.textContent = `
        @keyframes containerPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }
        
        @keyframes successBounce {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(additionalStyle);

    // Enhanced Real-time Validation with Better Feedback
    usernameInput.addEventListener('blur', function() {
        if (this.value.trim() && this.value.trim().length < 3) {
            showError(this, 'Username must be at least 3 characters');
        } else if (this.value.trim()) {
            showSuccess(this);
        }
    });
    
    passwordInput.addEventListener('blur', function() {
        if (this.value && this.value.length < 6) {
            showError(this, 'Password must be at least 6 characters');
        } else if (this.value) {
            showSuccess(this);
        }
    });

    // Enhanced Input Focus Effects
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.closest('.form-group').style.transform = 'scale(1.02)';
            this.closest('.form-group').style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            // Add floating label effect
            const label = this.closest('.form-group').querySelector('label');
            label.style.color = '#ff6b35';
            label.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.closest('.form-group').style.transform = 'scale(1)';
            
            // Reset label
            const label = this.closest('.form-group').querySelector('label');
            label.style.color = '#333';
            label.style.transform = 'translateY(0)';
        });
    });

    // Enhanced Social Login Buttons with Better Animation
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.classList.contains('google') ? 'Google' : 'Facebook';
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            showMessage(`🔗 Connecting to ${platform}...`, 'info');
            
            // Simulate social login process
            setTimeout(() => {
                showMessage(`✨ ${platform} login feature coming soon!`, 'info');
            }, 1500);
        });
    });

    // Enhanced Forgot Password Link
    const forgotLink = document.querySelector('.forgot-link');
    if (forgotLink) {
        forgotLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            showMessage('🔐 Password reset feature coming soon!', 'info');
        });
    }

    // Enhanced Register Link
    const registerLink = document.querySelector('.register-link a');
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            showMessage('📝 Registration feature coming soon!', 'info');
        });
    }

    // Enhanced Page Load Animation
    if (loginContainer) {
        loginContainer.style.opacity = '0';
        loginContainer.style.transform = 'translateY(50px) scale(0.9)';
        
        setTimeout(() => {
            loginContainer.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            loginContainer.style.opacity = '1';
            loginContainer.style.transform = 'translateY(0) scale(1)';
        }, 100);
    }

    // Enhanced Hover Effects for Form Elements
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        group.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Add floating particles effect
    createFloatingParticles();
});

// Create floating particles for background
function createFloatingParticles() {
    const loginSection = document.querySelector('.login-section');
    if (!loginSection) return;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 107, 53, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 20 + 10}s linear infinite;
            z-index: 1;
        `;
        
        loginSection.appendChild(particle);
    }
    
    // Add CSS for particle animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
}

// Enhanced notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Enhanced styling
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 18px 25px;
        border-radius: 15px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #dc3545, #e74c3c)';
            break;
        case 'warning':
            notification.style.background = 'linear-gradient(135deg, #ffc107, #fd7e14)';
            notification.style.color = '#333';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #17a2b8, #6f42c1)';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 500);
    }, 5000);
} 