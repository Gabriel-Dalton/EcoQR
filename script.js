document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const textInput = document.getElementById('textInput');
    const qrPopup = document.getElementById('qrPopup');
    const closePopup = document.getElementById('closePopup');
    const qrCodeDiv = document.getElementById('qrCode');
    const qrColorInput = document.getElementById('qrColor');
    const qrSizeInput = document.getElementById('qrSize');
    const errorCorrectionInput = document.getElementById('errorCorrection');
    
    let qrCode;

    generateBtn.addEventListener('click', () => {
        const text = textInput.value;
        const color = qrColorInput.value;
        const size = parseInt(qrSizeInput.value);
        const errorCorrection = errorCorrectionInput.value;
        
        if (text.trim() !== '') {
            qrCodeDiv.innerHTML = '';
            qrCode = new QRCode(qrCodeDiv, {
                text: text,
                width: size,
                height: size,
                colorDark : color,
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel[errorCorrection]
            });

            qrPopup.classList.remove('hidden');
        } else {
            alert('Please enter text or URL.');
        }
    });

    closePopup.addEventListener('click', () => {
        qrPopup.classList.add('hidden');
    });

    qrPopup.addEventListener('click', (e) => {
        if (e.target === qrPopup) {
            qrPopup.classList.add('hidden');
        }
    });

    function downloadQRImage(type) {
        if (!qrCode) return;
        
        const qrCanvas = qrCodeDiv.querySelector('canvas');
        if (!qrCanvas) return;

        const dataURL = qrCanvas.toDataURL(`image/${type}`);
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = `qr-code.${type}`;
        link.click();
    }

    document.getElementById('downloadPng').addEventListener('click', () => {
        downloadQRImage('png');
    });

    document.getElementById('downloadJpeg').addEventListener('click', () => {
        downloadQRImage('jpeg');
    });

    document.getElementById('downloadSvg').addEventListener('click', () => {
        if (!qrCode) return;
        const qrSvg = qrCode._oDrawing._el.getElementsByTagName("svg")[0].outerHTML;
        const blob = new Blob([qrSvg], { type: 'image/svg+xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'qr-code.svg';
        link.click();
    });
});
