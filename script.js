// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Contact Form Handling (for donate page)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const interest = document.getElementById('interest').value;

            if (!name || !email) {
                alert('Please fill in all required fields.');
                return;
            }

            alert(`Thank you for your interest, ${name}!\n\nWe've received your inquiry and will respond to ${email} within 24-48 hours.\n\nIn the meantime, feel free to explore our sponsorship opportunities.`);

            // Optionally reset form
            contactForm.reset();
        });
    }

    // Legacy donation form handling (kept for compatibility)
    const donationForm = document.getElementById('donation-form');
    if (donationForm) {
        // Donation type selector
        const typeBtns = document.querySelectorAll('.type-btn');
        const companyField = document.getElementById('company-field');

        typeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                typeBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                if (this.dataset.type === 'corporate') {
                    companyField.style.display = 'block';
                    document.getElementById('company-name').required = true;
                } else {
                    companyField.style.display = 'none';
                    document.getElementById('company-name').required = false;
                }
            });
        });

        // Amount selection
        const amountBtns = document.querySelectorAll('.amount-btn');
        const customAmountInput = document.getElementById('custom-amount');
        let selectedAmount = null;

        amountBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                amountBtns.forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');

                if (this.dataset.amount === 'custom') {
                    customAmountInput.style.display = 'block';
                    customAmountInput.focus();
                    selectedAmount = null;
                } else {
                    customAmountInput.style.display = 'none';
                    selectedAmount = this.dataset.amount;
                }
            });
        });

        customAmountInput.addEventListener('input', function() {
            selectedAmount = this.value;
        });

        // Form submission
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (!selectedAmount || selectedAmount <= 0) {
                alert('Please select or enter a donation amount.');
                return;
            }

            // In production, this would redirect to the actual fundraising page
            alert(`Thank you for your donation of $${selectedAmount}!\n\nIn the live version, this will redirect to the secure fundraising page for payment processing.`);

            // Optionally reset form
            // donationForm.reset();
            // amountBtns.forEach(b => b.classList.remove('selected'));
            // customAmountInput.style.display = 'none';
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Progress bar animation (if on home page)
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        // This could be dynamically updated with actual fundraising data
        const currentAmount = 0;
        const goalAmount = 10000;
        const percentage = (currentAmount / goalAmount) * 100;

        // Animate progress bar
        setTimeout(() => {
            progressBar.style.width = percentage + '%';
        }, 500);
    }
});

// Function to update progress (can be called when new donations come in)
function updateProgress(raised, goal) {
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    const raisedValue = document.querySelector('.stat-value');

    if (progressBar && progressText && raisedValue) {
        const percentage = Math.min((raised / goal) * 100, 100);
        progressBar.style.width = percentage + '%';
        progressText.textContent = `${percentage.toFixed(1)}% of our goal reached`;
        raisedValue.textContent = `$${raised.toLocaleString()}`;
    }
}
