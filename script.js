document.addEventListener("DOMContentLoaded", function() {
    const steps = document.querySelectorAll(".form-step");
    const nextBtns = document.querySelectorAll(".btn-next");
    const prevBtns = document.querySelectorAll(".btn-prev");
    const progressBar = document.querySelector(".progress");
    let currentStep = 0;

    function showStep(step) {
        steps.forEach((item, index) => {
            item.classList.remove("form-step-active");
            if (index === step) {
                item.classList.add("form-step-active");
            }
        });
        updateProgressBar(step);
    }

    function updateProgressBar(step) {
        const progressWidth = ((step + 1) / steps.length) * 100;
        progressBar.style.width = progressWidth + "%";
    }

    function validateStep(step) {
        const inputs = steps[step].querySelectorAll("input");
        let isValid = true;

        inputs.forEach(input => {
            const errorElement = document.getElementById(`${input.id}Error`);
            if (!input.checkValidity()) {
                errorElement.style.display = "block";
                isValid = false;
            } else {
                errorElement.style.display = "none";
            }
        });

        return isValid;
    }

    nextBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            currentStep--;
            showStep(currentStep);
        });
    });

    // Form submission handling
    const form = document.getElementById("multiStepForm");
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        if (validateStep(currentStep)) {
            alert("Form submitted successfully!");
        }
    });

    // Initially show the first step
    showStep(currentStep);
});
