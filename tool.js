const scoreInput = document.getElementById('scoreInput');
const numbersDisplay = document.getElementById('numbersDisplay');
const numbersDisplay2 = document.getElementById('numbersDisplay2');
const reverseToggle = document.getElementById('reverseToggle');
let isReversed = false;
let currentNumbers = [];
let secondNumbers = [];

function showNumbers() {
    const total = parseInt(scoreInput.value);
    
    if (isNaN(total) || total < 0) {
        // Xóa hiển thị nếu input không hợp lệ
        currentNumbers = [];
        secondNumbers = [];
        displayNumbers();
        updateTotal(0);
        return;
    }

    // Tạo mảng cho ô thứ nhất
    const count3 = 2;
    const remaining = total - count3;
    const count2 = Math.floor(remaining / 2);
    const count1 = remaining - count2;
    
    if (!isReversed) {
        currentNumbers = [
            ...Array(count2).fill(2),
            3,
            ...Array(count1).fill(1),
            3
        ];
    } else {
        currentNumbers = [
            ...Array(count1).fill(1),
            3,
            ...Array(count2).fill(2),
            3
        ];
    }

    // Tạo mảng cho ô thứ hai
    secondNumbers = generateSecondPattern(total);

    displayNumbers();
    updateTotal(total);
    
    // Bỏ 2 dòng này
    // scoreInput.value = '';
    // scoreInput.focus();
}

function generateSecondPattern(total) {
    if (total <= 0) return [];
    
    // Các mẫu cố định cho số nhỏ
    const patterns = {
        8: [2,5,2,3,1,4,1,3],
        9: [2,5,2,3,1,4,1,4,3],
        10: [2,5,2,5,3,1,4,1,4,3],
        11: [2,5,2,5,3,1,4,1,4,1,3],
        12: [2,5,2,5,2,3,1,4,1,4,1,3],
        13: [2,5,2,5,2,3,1,4,1,4,1,4,3],
        14: [2,5,2,5,2,5,3,1,4,1,4,1,4,3],
        15: [2,5,2,5,2,5,3,1,4,1,4,1,4,1,3]
    };
    
    // Nếu có mẫu cố định và không đảo ngược, trả về mẫu đó
    if (patterns[total] && !isReversed) {
        return patterns[total];
    }
    
    let result = [];
    
    // Tính số lượng cho mỗi nhóm (2,5 và 1,4)
    const numbersPerGroup = Math.floor((total - 2) / 2);
    const pairs = Math.floor(numbersPerGroup / 2);
    
    if (isReversed) {
        // Thêm các số 1,4 trước khi đảo ngược
        for (let i = 0; i < pairs; i++) {
            result.push(1, 4);
        }
        if (numbersPerGroup % 2 === 1) {
            result.push(1);
        }
        
        // Thêm số 3 đầu tiên
        result.push(3);
        
        // Thêm các số 2,5 sau
        for (let i = 0; i < pairs; i++) {
            result.push(2, 5);
        }
        if (numbersPerGroup % 2 === 1) {
            result.push(2);
        }
    } else {
        // Thêm các số 2,5 trước khi không đảo ngược
        for (let i = 0; i < pairs; i++) {
            result.push(2, 5);
        }
        if (numbersPerGroup % 2 === 1) {
            result.push(2);
        }
        
        // Thêm số 3 đầu tiên
        result.push(3);
        
        // Thêm các số 1,4 sau
        for (let i = 0; i < pairs; i++) {
            result.push(1, 4);
        }
        if (numbersPerGroup % 2 === 1) {
            result.push(1);
        }
    }
    
    // Thêm số 3 cuối cùng
    result.push(3);
    
    return result;
}

function displayNumbers() {
    // Hiển thị cho ô thứ nhất
    numbersDisplay.innerHTML = '';
    displayNumbersInContainer(numbersDisplay, currentNumbers);
    
    // Hiển thị cho ô thứ hai
    numbersDisplay2.innerHTML = '';
    displayNumbersInContainer(numbersDisplay2, secondNumbers);
}

function reverseOrder() {
    isReversed = reverseToggle.checked;
    
    if (currentNumbers.length > 0) {
        const total = currentNumbers.length;
        
        if (isReversed) {
            // Đảo ngược cả hai dãy - bắt đầu bằng số 1
            const count3 = 2;
            const remaining = total - count3;
            const count2 = Math.floor(remaining / 2);
            const count1 = remaining - count2;
            
            // Dãy thứ nhất: 1,1,1,3,2,2,2,3
            currentNumbers = [
                ...Array(count1).fill(1),
                3,
                ...Array(count2).fill(2),
                3
            ];
            
            // Dãy thứ hai: 1,4,1,4,3,2,5,2,3
            const numbersPerGroup = Math.floor((total - 2) / 2);
            secondNumbers = [];
            
            // Thêm các số 1,4 trước
            const pairs14 = Math.floor(numbersPerGroup / 2);
            for (let i = 0; i < pairs14; i++) {
                secondNumbers.push(1, 4);
            }
            if (numbersPerGroup % 2 === 1) {
                secondNumbers.push(1);
            }
            
            // Thêm số 3 đầu tiên
            secondNumbers.push(3);
            
            // Thêm các số 2,5 sau
            for (let i = 0; i < pairs14; i++) {
                secondNumbers.push(2, 5);
            }
            if (numbersPerGroup % 2 === 1) {
                secondNumbers.push(2);
            }
            
            // Thêm số 3 cuối cùng
            secondNumbers.push(3);
            
        } else {
            // Trở về thứ tự ban đầu - bắt đầu bằng số 2
            const count3 = 2;
            const remaining = total - count3;
            const count2 = Math.floor(remaining / 2);
            const count1 = remaining - count2;
            
            // Dãy thứ nhất: 2,2,2,3,1,1,1,3
            currentNumbers = [
                ...Array(count2).fill(2),
                3,
                ...Array(count1).fill(1),
                3
            ];
            
            // Dãy thứ hai: 2,5,2,5,3,1,4,1,3
            const numbersPerGroup = Math.floor((total - 2) / 2);
            secondNumbers = [];
            
            // Thêm các số 2,5 trước
            const pairs25 = Math.floor(numbersPerGroup / 2);
            for (let i = 0; i < pairs25; i++) {
                secondNumbers.push(2, 5);
            }
            if (numbersPerGroup % 2 === 1) {
                secondNumbers.push(2);
            }
            
            // Thêm số 3 đầu tiên
            secondNumbers.push(3);
            
            // Thêm các số 1,4 sau
            for (let i = 0; i < pairs25; i++) {
                secondNumbers.push(1, 4);
            }
            if (numbersPerGroup % 2 === 1) {
                secondNumbers.push(1);
            }
            
            // Thêm số 3 cuối cùng
            secondNumbers.push(3);
        }
        
        displayNumbers();
    }
}

function displayNumbersInContainer(container, numbers) {
    numbers.forEach((num, i) => {
        const span = document.createElement('span');
        span.className = 'number';
        span.textContent = num;
        span.style.animationDelay = `${i * 30}ms`;
        container.appendChild(span);

        if (i < numbers.length - 1) {
            const comma = document.createElement('span');
            comma.className = 'comma';
            comma.textContent = ',';
            container.appendChild(comma);
        }
    });
}

function copyNumbers() {
    if (currentNumbers.length === 0) return;
    
    const numberString = currentNumbers.join(',');
    navigator.clipboard.writeText(numberString).then(() => {
        const copyBtn = document.querySelector('.inline-copy-btn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000); // 2 giây
    });
}

function copyNumbers2() {
    if (secondNumbers.length === 0) return;
    
    const numberString = secondNumbers.join(',');
    navigator.clipboard.writeText(numberString).then(() => {
        const copyBtn = document.querySelectorAll('.inline-copy-btn')[1];
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000); // 2 giây
    });
}

// Thêm debounce để tránh tính toán quá nhiều
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Sử dụng debounce cho event listener
scoreInput.addEventListener('input', debounce(function() {
    showNumbers();
}, 100)); // Đợi 100ms sau khi người dùng ngừng gõ

// Thêm hàm mới để cập nhật tổng số
function updateTotal(total) {
    document.getElementById('totalCount').textContent = total;
    document.getElementById('totalCount2').textContent = total;
}
