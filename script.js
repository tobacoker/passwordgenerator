const characterAmountRange = document.getElementById('characterAmountRange');
const characterAmountNumber = document.getElementById('characterAmountNumber');
const includeUppercase = document.getElementById('includeUppercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('IncludeSymbols');
const form = document.getElementById('passwordGeneratorForm');
const passwordDisplay = document.getElementById('password');


function promptPasswordCriteria() {
  let length = parseInt(prompt("Enter the length of the password (between 8 and 128 characters):"));

  // Validate the length
  while (isNaN(length) || length < 8 || length > 128) {
    length = parseInt(prompt("Invalid length! Please enter a number between 8 and 128:"));
  }

  const includeUpper = confirm("Include uppercase characters?");
  const includeNumber = confirm("Include numbers?");
  const includeSymbol = confirm("Include special characters?");

  //  to Validate at least one character type is selected
  if (!includeUpper && !includeNumber && !includeSymbol) {
    alert("At least one character type must be selected!");
    return null;
  }

  return {
    length,
    includeUpper,
    includeNumber,
    includeSymbol
  };
}

// Function to generate password based on criteria
function generatePassword() {
  const criteria = promptPasswordCriteria();

  if (criteria === null) {
    return; //if user canceled or provided invalid input
  }

  const { length, includeUpper, includeNumber, includeSymbol } = criteria;

  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()-_+=~';

  let chars = lowercaseChars;
  if (includeUpper) chars += uppercaseChars;
  if (includeNumber) chars += numberChars;
  if (includeSymbol) chars += symbolChars;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
}

// Function to update password display
function updateDisplay() {
  const password = generatePassword();
  passwordDisplay.value = password;
}

// Event listener for form submission
form.addEventListener('submit', function (e) {
  e.preventDefault();
  updateDisplay();
});

// Event listeners for range and number input synchronization
characterAmountRange.addEventListener('input', function () {
  characterAmountNumber.value = characterAmountRange.value;
});

characterAmountNumber.addEventListener('input', function () {
  characterAmountRange.value = characterAmountNumber.value;
});

// Initial password display
updateDisplay();