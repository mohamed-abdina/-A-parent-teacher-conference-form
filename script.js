document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('conference-form');
  const successMessage = document.getElementById('success-message');
  const preferredDate = document.getElementById('preferred-date');
  
  // Set minimum date to today
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  preferredDate.min = tomorrow.toISOString().split('T')[0];
  
  // Form submission handler
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    // Simple validation check
    if (!validateForm(data)) {
      return;
    }
    
    // Simulate form submission
    console.log('Form submitted:', data);
    
    // Show success message
    form.classList.add('hidden');
    successMessage.classList.remove('hidden');
    
    // Reset form after delay
    setTimeout(() => {
      form.reset();
      form.classList.remove('hidden');
      successMessage.classList.add('hidden');
    }, 5000);
  });
  
  // Form validation function
  function validateForm(data) {
    // Check required fields
    const requiredFields = [
      'parent-name', 'parent-email', 'parent-phone',
      'student-name', 'student-grade', 'teacher-name',
      'preferred-date', 'preferred-time', 'reason', 'format'
    ];
    
    for (const field of requiredFields) {
      if (!data[field] || data[field].trim() === '') {
        alert(`Please fill in the ${field.replace(/-/g, ' ')} field.`);
        return false;
      }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data['parent-email'])) {
      alert('Please enter a valid email address.');
      return false;
    }
    
    // Phone validation (simple US format)
    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
    if (!phoneRegex.test(data['parent-phone'])) {
      alert('Please enter a valid phone number.');
      return false;
    }
    
    // Date validation (must be a weekday)
    const date = new Date(data['preferred-date']);
    const day = date.getDay();
    if (day === 0 || day === 6) {
      alert('Please select a weekday (Monday-Friday).');
      return false;
    }
    
    return true;
  }
  
  // Real-time validation feedback
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.required && !this.value.trim()) {
        this.style.borderColor = '#e74c3c';
      } else {
        this.style.borderColor = '#ddd';
      }
    });
    
    input.addEventListener('input', function() {
      if (this.style.borderColor === 'rgb(231, 76, 60)' && this.value.trim()) {
        this.style.borderColor = '#ddd';
      }
    });
  });
  
  // Format phone number as user types
  const phoneInput = document.getElementById('parent-phone');
  phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 6) {
      value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6,10)}`;
    } else if (value.length >= 3) {
      value = `(${value.slice(0,3)}) ${value.slice(3)}`;
    }
    e.target.value = value;
  });
});