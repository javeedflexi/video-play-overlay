const imageInput = document.getElementById('imageInput');
const originalImage = document.getElementById('originalImage');
const outputCanvas = document.getElementById('outputCanvas');
const downloadBtn = document.getElementById('downloadBtn');
const ctx = outputCanvas.getContext('2d');

// Play button style presets
const BUTTON_STYLES = {
    classic: {
        name: "Classic Triangle in Circle",
        draw: function(centerX, centerY, radius) {
            // Draw semi-transparent dark circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fill();
            
            // Add subtle highlight/shadow for 3D effect
            const gradient = ctx.createRadialGradient(
                centerX - radius * 0.3, centerY - radius * 0.3, radius * 0.1,
                centerX, centerY, radius
            );
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * 0.9, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Draw white play triangle with subtle shadow
            const triangleSize = radius * 0.8;
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 5;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            
            ctx.beginPath();
            ctx.moveTo(triangleSize/2, 0);
            ctx.lineTo(-triangleSize/2, triangleSize/2);
            ctx.lineTo(-triangleSize/2, -triangleSize/2);
            ctx.closePath();
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.restore();
        }
    },
    
    youtubeStyle: {
        name: "YouTube Style",
        draw: function(centerX, centerY, radius) {
            // Draw solid red circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fillStyle = '#FF0000'; // YouTube red
            ctx.fill();
            
            // Draw white triangle
            const triangleSize = radius * 0.7;
            ctx.beginPath();
            
            // Adjust position slightly to center it visually
            ctx.moveTo(centerX + triangleSize/2 + radius * 0.05, centerY);
            ctx.lineTo(centerX - triangleSize/2 + radius * 0.05, centerY + triangleSize/2);
            ctx.lineTo(centerX - triangleSize/2 + radius * 0.05, centerY - triangleSize/2);
            ctx.closePath();
            
            ctx.fillStyle = 'white';
            ctx.fill();
        }
    },
    
    youtubeLogo: {
        name: "YouTube Logo",
        draw: function(centerX, centerY, radius) {
            const width = radius * 1.7;  // Width of the rounded rectangle
            const height = radius * 1.2; // Height of the rounded rectangle
            const cornerRadius = height * 0.4; // Increased corner radius for more rounded look
            
            // Calculate the top-left position to center the logo
            const x = centerX - width / 2;
            const y = centerY - height / 2;
            
            // Draw rounded rectangle
            ctx.save();
            ctx.beginPath();
            
            // Top-left corner
            ctx.moveTo(x + cornerRadius, y);
            // Top right
            ctx.lineTo(x + width - cornerRadius, y);
            ctx.arcTo(x + width, y, x + width, y + cornerRadius, cornerRadius);
            // Bottom right
            ctx.lineTo(x + width, y + height - cornerRadius);
            ctx.arcTo(x + width, y + height, x + width - cornerRadius, y + height, cornerRadius);
            // Bottom left
            ctx.lineTo(x + cornerRadius, y + height);
            ctx.arcTo(x, y + height, x, y + height - cornerRadius, cornerRadius);
            // Top left
            ctx.lineTo(x, y + cornerRadius);
            ctx.arcTo(x, y, x + cornerRadius, y, cornerRadius);
            
            // Fill with YouTube red
            ctx.fillStyle = '#FF0000';
            ctx.fill();
            ctx.restore();
            
            // Draw white play triangle
            const triangleSize = height * 0.5;
            ctx.beginPath();
            
            // Center the triangle slightly to the right for visual balance
            const triangleX = centerX + width * 0.02;
            
            ctx.moveTo(triangleX + triangleSize/2, centerY);
            ctx.lineTo(triangleX - triangleSize/2, centerY + triangleSize/2);
            ctx.lineTo(triangleX - triangleSize/2, centerY - triangleSize/2);
            ctx.closePath();
            
            ctx.fillStyle = 'white';
            ctx.fill();
        }
    },
    
    rounded: {
        name: "Rounded Button with Shadow",
        draw: function(centerX, centerY, radius) {
            // Draw dark rounded button base
            ctx.save();
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            
            // Apply shadow
            ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
            ctx.shadowBlur = 15;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 5;
            
            // Gradient fill
            const gradient = ctx.createLinearGradient(
                centerX, centerY - radius, 
                centerX, centerY + radius
            );
            gradient.addColorStop(0, '#2d3748');
            gradient.addColorStop(1, '#1a202c');
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.restore();
            
            // Add highlight
            ctx.beginPath();
            ctx.arc(centerX, centerY - radius * 0.2, radius * 0.8, 0, Math.PI, true);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.fill();
            
            // Draw play triangle
            ctx.beginPath();
            ctx.moveTo(centerX + radius * 0.4, centerY);
            ctx.lineTo(centerX - radius * 0.2, centerY + radius * 0.4);
            ctx.lineTo(centerX - radius * 0.2, centerY - radius * 0.4);
            ctx.closePath();
            ctx.fillStyle = 'white';
            ctx.fill();
        }
    },
    
    minimal: {
        name: "Minimal Flat Design",
        draw: function(centerX, centerY, radius) {
            // Draw flat circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fillStyle = '#22c55e'; // Green accent
            ctx.fill();
            
            // Draw white play triangle with offset
            ctx.beginPath();
            ctx.moveTo(centerX + radius * 0.3, centerY);
            ctx.lineTo(centerX - radius * 0.2, centerY + radius * 0.3);
            ctx.lineTo(centerX - radius * 0.2, centerY - radius * 0.3);
            ctx.closePath();
            ctx.fillStyle = 'white';
            ctx.fill();
        }
    },
    
    neon: {
        name: "Neon/Glowing Effect",
        draw: function(centerX, centerY, radius) {
            // Draw outer glow
            const glowRadius = radius * 1.2;
            const gradient = ctx.createRadialGradient(
                centerX, centerY, radius * 0.8,
                centerX, centerY, glowRadius
            );
            gradient.addColorStop(0, 'rgba(32, 221, 153, 0.9)');
            gradient.addColorStop(0.5, 'rgba(32, 221, 153, 0.4)');
            gradient.addColorStop(1, 'rgba(32, 221, 153, 0)');
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, glowRadius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Draw inner circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * 0.9, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(18, 18, 18, 0.7)';
            ctx.fill();
            
            // Draw neon play triangle
            ctx.beginPath();
            ctx.moveTo(centerX + radius * 0.4, centerY);
            ctx.lineTo(centerX - radius * 0.3, centerY + radius * 0.4);
            ctx.lineTo(centerX - radius * 0.3, centerY - radius * 0.4);
            ctx.closePath();
            
            // Add glow effect
            ctx.shadowColor = 'rgba(32, 221, 153, 1)';
            ctx.shadowBlur = 15;
            ctx.fillStyle = 'rgba(32, 221, 153, 1)';
            ctx.fill();
        }
    },
    
    outline: {
        name: "Outline Only Style",
        draw: function(centerX, centerY, radius) {
            // Draw circle outline
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = 'white';
            ctx.lineWidth = radius * 0.06;
            ctx.stroke();
            
            // Draw play triangle outline
            ctx.beginPath();
            ctx.moveTo(centerX + radius * 0.35, centerY);
            ctx.lineTo(centerX - radius * 0.25, centerY + radius * 0.35);
            ctx.lineTo(centerX - radius * 0.25, centerY - radius * 0.35);
            ctx.closePath();
            ctx.strokeStyle = 'white';
            ctx.lineJoin = 'round';
            ctx.stroke();
        }
    },
    
    // New styles based on the reference image
    redCircular: {
        name: "Bold Red Circle",
        draw: function(centerX, centerY, radius) {
            // Draw transparent center
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * 0.9, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.fill();
            
            // Draw red circle outline
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = '#ff3333';
            ctx.lineWidth = radius * 0.1;
            ctx.stroke();
            
            // Draw red triangle
            ctx.beginPath();
            ctx.moveTo(centerX + radius * 0.4, centerY);
            ctx.lineTo(centerX - radius * 0.2, centerY + radius * 0.35);
            ctx.lineTo(centerX - radius * 0.2, centerY - radius * 0.35);
            ctx.closePath();
            ctx.fillStyle = '#ff3333';
            ctx.fill();
        }
    },
    
    blueCircular: {
        name: "Bold Blue Circle",
        draw: function(centerX, centerY, radius) {
            // Draw transparent center
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * 0.9, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.fill();
            
            // Draw blue circle outline
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = radius * 0.1;
            ctx.stroke();
            
            // Draw blue triangle
            ctx.beginPath();
            ctx.moveTo(centerX + radius * 0.4, centerY);
            ctx.lineTo(centerX - radius * 0.2, centerY + radius * 0.35);
            ctx.lineTo(centerX - radius * 0.2, centerY - radius * 0.35);
            ctx.closePath();
            ctx.fillStyle = '#3b82f6';
            ctx.fill();
        }
    },
    
    yellowCircular: {
        name: "Bold Yellow Circle",
        draw: function(centerX, centerY, radius) {
            // Draw transparent center
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * 0.9, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.fill();
            
            // Draw yellow circle outline
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = '#eab308';
            ctx.lineWidth = radius * 0.1;
            ctx.stroke();
            
            // Draw yellow triangle
            ctx.beginPath();
            ctx.moveTo(centerX + radius * 0.4, centerY);
            ctx.lineTo(centerX - radius * 0.2, centerY + radius * 0.35);
            ctx.lineTo(centerX - radius * 0.2, centerY - radius * 0.35);
            ctx.closePath();
            ctx.fillStyle = '#eab308';
            ctx.fill();
        }
    },
    
    glassmorphism: {
        name: "Glassmorphism Style",
        draw: function(centerX, centerY, radius) {
            // Create glass effect
            ctx.save();
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            
            // Create glass blur effect
            ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
            ctx.shadowBlur = 20;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.fill();
            
            // Add glass border
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = radius * 0.05;
            ctx.stroke();
            ctx.restore();
            
            // Add light reflection
            ctx.beginPath();
            ctx.arc(centerX - radius * 0.3, centerY - radius * 0.3, radius * 0.2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.fill();
            
            // Draw play triangle
            ctx.beginPath();
            ctx.moveTo(centerX + radius * 0.35, centerY);
            ctx.lineTo(centerX - radius * 0.2, centerY + radius * 0.35);
            ctx.lineTo(centerX - radius * 0.2, centerY - radius * 0.35);
            ctx.closePath();
            
            const triangleGradient = ctx.createLinearGradient(
                centerX - radius * 0.2, centerY - radius * 0.35,
                centerX + radius * 0.35, centerY + radius * 0.35
            );
            triangleGradient.addColorStop(0, '#ec4899');
            triangleGradient.addColorStop(1, '#8b5cf6');
            
            ctx.fillStyle = triangleGradient;
            ctx.fill();
        }
    },
    
    gradientFill: {
        name: "Gradient Fill",
        draw: function(centerX, centerY, radius) {
            // Create gradient fill for the circle
            const circleGradient = ctx.createLinearGradient(
                centerX - radius, centerY - radius,
                centerX + radius, centerY + radius
            );
            circleGradient.addColorStop(0, '#f43f5e');
            circleGradient.addColorStop(1, '#8b5cf6');
            
            // Draw circle with gradient
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fillStyle = circleGradient;
            ctx.fill();
            
            // Add highlight
            ctx.beginPath();
            ctx.arc(centerX, centerY - radius * 0.5, radius * 0.8, Math.PI, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.fill();
            
            // Draw white play triangle
            ctx.beginPath();
            ctx.moveTo(centerX + radius * 0.35, centerY);
            ctx.lineTo(centerX - radius * 0.2, centerY + radius * 0.35);
            ctx.lineTo(centerX - radius * 0.2, centerY - radius * 0.35);
            ctx.closePath();
            ctx.fillStyle = 'white';
            ctx.fill();
        }
    }
};

// Currently selected button style
let currentButtonStyle = 'classic';

// Default canvas background for dark theme
function setCanvasDefaults() {
    ctx.fillStyle = '#334155'; // Match card background
    ctx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);
    
    // Draw placeholder text
    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Upload an image to see preview', outputCanvas.width / 2, outputCanvas.height / 2);
}

// Set initial canvas size
outputCanvas.width = 400;
outputCanvas.height = 300;
setCanvasDefaults();

// Load demo image on page load
window.addEventListener('load', function() {
    // Create style selector
    createStyleSelector();
    
    const demoImage = new Image();
    demoImage.onload = function() {
        // Display original image
        originalImage.src = demoImage.src;
        
        // Set canvas dimensions to match image
        outputCanvas.width = demoImage.width;
        outputCanvas.height = demoImage.height;
        
        // Draw image on canvas
        ctx.drawImage(demoImage, 0, 0);
        
        // Draw play button
        drawPlayButton();
        
        // Enable download button
        downloadBtn.disabled = false;
    };
    demoImage.onerror = function() {
        console.log('Demo image could not be loaded. Using default canvas.');
        setCanvasDefaults();
    };
    demoImage.src = 'demo-image.png'; // Updated to use PNG extension
});

// Create the style selector UI
function createStyleSelector() {
    const uploadSection = document.querySelector('.upload-section');
    
    // Create style selector container
    const selectorContainer = document.createElement('div');
    selectorContainer.className = 'style-selector';
    selectorContainer.innerHTML = '<p class="style-title">Choose Play Button Style:</p>';
    
    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'style-buttons';
    
    // Add style buttons
    for (const style in BUTTON_STYLES) {
        const button = document.createElement('button');
        button.className = 'style-button' + (style === currentButtonStyle ? ' active' : '');
        button.dataset.style = style;
        button.innerHTML = BUTTON_STYLES[style].name;
        
        button.addEventListener('click', function() {
            currentButtonStyle = this.dataset.style;
            
            // Update active button styling
            document.querySelectorAll('.style-button').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Redraw button if we have an image
            if (originalImage.src) {
                drawPlayButton();
            }
        });
        
        buttonContainer.appendChild(button);
    }
    
    selectorContainer.appendChild(buttonContainer);
    uploadSection.after(selectorContainer);
}

// Handle image upload
imageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                // Display original image
                originalImage.src = event.target.result;
                
                // Set canvas dimensions to match image
                outputCanvas.width = img.width;
                outputCanvas.height = img.height;
                
                // Draw image on canvas
                ctx.drawImage(img, 0, 0);
                
                // Draw play button
                drawPlayButton();
                
                // Enable download button
                downloadBtn.disabled = false;
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Draw play button overlay
function drawPlayButton() {
    const centerX = outputCanvas.width / 2;
    const centerY = outputCanvas.height / 2;
    const radius = Math.min(outputCanvas.width, outputCanvas.height) * 0.15; // Play button size

    // Redraw the image to clear previous button
    if (originalImage.complete && originalImage.naturalWidth) {
        ctx.drawImage(originalImage, 0, 0, outputCanvas.width, outputCanvas.height);
    }
    
    // Draw selected button style
    BUTTON_STYLES[currentButtonStyle].draw(centerX, centerY, radius);
}

// Handle download
downloadBtn.addEventListener('click', function() {
    const link = document.createElement('a');
    link.download = 'image-with-play-button.png';
    link.href = outputCanvas.toDataURL('image/png');
    link.click();
}); 