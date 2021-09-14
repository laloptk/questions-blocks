/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/FrontEndRender.js":
/*!******************************************!*\
  !*** ./src/components/FrontEndRender.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _frontend_TrueFalseUserAnswer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./frontend/TrueFalseUserAnswer */ "./src/components/frontend/TrueFalseUserAnswer.js");
/* harmony import */ var _frontend_MultipleChoiceUserAnswer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./frontend/MultipleChoiceUserAnswer */ "./src/components/frontend/MultipleChoiceUserAnswer.js");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/helpers */ "./src/utils/helpers.js");






const FrontEndRender = ({
  dataAttributes
}) => {
  const [userAnswer, setUserAnswer] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [answerIsCorrect, setIsCorrect] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [isLoading, setLoading] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [attributes, setAttributes] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    block_id: 0,
    post_id: 0,
    question: '',
    block_name: ''
  });
  Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setAttributes({ ...dataAttributes
    });
  }, []);

  const apiCall = async () => {
    setLoading(true);
    const response = await Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_3__["getBlocksData"])(`${qasAPIRoute}/${dataAttributes.post_id}`, 'POST');
    setIsCorrect(Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_3__["compareAnswers"])(userAnswer, response[attributes.block_id][0]['attrs']['rightAnswer']));
    setLoading(false);
  }; //console.log( userAnswer );


  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, attributes.block_name === 'qa/true-false' && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_frontend_TrueFalseUserAnswer__WEBPACK_IMPORTED_MODULE_1__["default"], {
    isCorrect: answerIsCorrect,
    question: attributes.question,
    userAnswer: userAnswer,
    loading: isLoading,
    blocksData: apiCall,
    onChange: setUserAnswer
  }), attributes.block_name === 'qa/fill-blanks' && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", null, "Fill Blanks"), attributes.block_name === 'qa/matching-columns' && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", null, "Matching Columns"), attributes.block_name === 'qa/multiple-choice' && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_frontend_MultipleChoiceUserAnswer__WEBPACK_IMPORTED_MODULE_2__["default"], {
    isCorrect: answerIsCorrect,
    question: attributes.question,
    userAnswer: userAnswer,
    loading: isLoading,
    blocksData: apiCall,
    onChange: setUserAnswer,
    options: attributes.options,
    rightChoicesQty: attributes.choosen_qty
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (FrontEndRender);

/***/ }),

/***/ "./src/components/frontend/MultipleChoiceUserAnswer.js":
/*!*************************************************************!*\
  !*** ./src/components/frontend/MultipleChoiceUserAnswer.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/helpers */ "./src/utils/helpers.js");






const MultipleChoiceUserAnswer = props => {
  const [checkValues, setCheckValues] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["useState"])(new Array(JSON.parse(props.options).length).fill(false));

  const handleSingleAnswer = value => {
    props.onChange([value]);
  };

  const handleMultipleAnswers = (value, option, index) => {
    setCheckValues([...checkValues.slice(0, index), value, ...checkValues.slice(index + 1)]);
    const optionIndex = props.userAnswer.indexOf(option);
    !checkValues[index] ? props.onChange([...props.userAnswer, option]) : props.onChange([...props.userAnswer.slice(0, optionIndex), ...props.userAnswer.slice(optionIndex + 1)]);
  };

  console.log(props.userAnswer);
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "qa-frontend",
    style: props.isCorrect === false ? {
      backgroundColor: '#FF7F7F'
    } : props.isCorrect === true ? {
      backgroundColor: '#98FB98'
    } : {
      backgroundColor: 'transparent'
    }
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "qa-frontend__question"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h2", null, props.question)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "qa-frontend__answer"
  }, parseInt(props.rightChoicesQty) <= 1 ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["RadioControl"], {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Answer'),
    selected: props.userAnswer[0],
    options: Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_3__["getComponentOptions"])(JSON.parse(props.options)),
    onChange: handleSingleAnswer
  }) : JSON.parse(props.options).map((option, index) => {
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["CheckboxControl"], {
      label: option,
      checked: checkValues[index],
      onChange: value => handleMultipleAnswers(value, option, index)
    });
  })), Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_3__["answerNotice"])(props.isCorrect), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    class: "qa-frontend__send"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "secondary",
    onClick: props.blocksData,
    disabled: (props.loading || props.userAnswer === '') === true
  }, props.userAnswer === '' ? Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Select an Answer Above') : props.loading ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Spinner"], null) : Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Send Answer'))));
};

/* harmony default export */ __webpack_exports__["default"] = (MultipleChoiceUserAnswer);

/***/ }),

/***/ "./src/components/frontend/TrueFalseUserAnswer.js":
/*!********************************************************!*\
  !*** ./src/components/frontend/TrueFalseUserAnswer.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/helpers */ "./src/utils/helpers.js");





const TrueFalseUserAnswer = props => {
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "qa-frontend",
    style: props.isCorrect === false ? {
      backgroundColor: '#FF7F7F'
    } : props.isCorrect === true ? {
      backgroundColor: '#98FB98'
    } : {
      backgroundColor: 'transparent'
    }
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "qa-frontend__question"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h2", null, props.question)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "qa-frontend__answer"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["RadioControl"], {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Answer'),
    help: props.userAnswer === undefined ? "Select an answer" : props.userAnswer ? "You selected 'True' as the right answer" : "You selected 'False' as the right answer",
    selected: props.userAnswer,
    options: [{
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('True'),
      value: 'true'
    }, {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('False'),
      value: 'false'
    }],
    onChange: props.onChange
  })), Object(_utils_helpers__WEBPACK_IMPORTED_MODULE_3__["answerNotice"])(props.isCorrect), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    class: "qa-frontend__send"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "secondary",
    onClick: props.blocksData,
    disabled: (props.loading || props.userAnswer === '') === true
  }, props.userAnswer === '' ? Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Select an Answer Above') : props.loading ? Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__["Spinner"], null) : Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Send Answer'))));
};

/* harmony default export */ __webpack_exports__["default"] = (TrueFalseUserAnswer);

/***/ }),

/***/ "./src/frontend.js":
/*!*************************!*\
  !*** ./src/frontend.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_FrontEndRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/FrontEndRender */ "./src/components/FrontEndRender.js");



const questionClass = '.qa-frontend-question-block';
const questions = document.querySelectorAll(questionClass);
questions.forEach(question => {
  const attributes = {
    block_id: question.dataset.id,
    post_id: parseInt(question.dataset.post_id, 10),
    question: question.dataset.question,
    block_name: question.dataset.block_name
  };

  if (question.dataset.options !== undefined) {
    attributes.options = question.dataset.options;
  }

  if (question.dataset.choosen_qty !== undefined) {
    attributes.choosen_qty = question.dataset.choosen_qty;
  }

  Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["render"])(Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_components_FrontEndRender__WEBPACK_IMPORTED_MODULE_1__["default"], {
    dataAttributes: attributes
  }), question);
});

/***/ }),

/***/ "./src/utils/helpers.js":
/*!******************************!*\
  !*** ./src/utils/helpers.js ***!
  \******************************/
/*! exports provided: extractWrappedStrings, getBlocksData, answerNotice, getRawOptions, getComponentOptions, getRightAnswers, compareAnswers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractWrappedStrings", function() { return extractWrappedStrings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBlocksData", function() { return getBlocksData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "answerNotice", function() { return answerNotice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRawOptions", function() { return getRawOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getComponentOptions", function() { return getComponentOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRightAnswers", function() { return getRightAnswers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compareAnswers", function() { return compareAnswers; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);



const extractWrappedStrings = (text, opener, closer) => {
  const answers = [];
  const question = text.replaceAll(closer, '').replaceAll(opener, '');

  if (typeof text !== 'string' || typeof opener !== 'string' || typeof closer !== 'string') {
    return;
  }

  while (text.indexOf(opener) && text.indexOf(closer) && text.indexOf(opener) < text.indexOf(closer)) {
    const openingIndex = text.indexOf(opener);
    const closingIndex = text.indexOf(closer);
    answers.push(text.substring(openingIndex + opener.length, closingIndex));
    text = text.substring(closingIndex + closer.length);
  }

  return {
    answers: answers,
    question: question
  };
};
const getBlocksData = (path, method) => {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
    path: path,
    method: method
  }).then(success => {
    return success;
  }).catch(error => {
    return {
      type: 'error',
      message: error.message
    };
  });
};
const answerNotice = isCorrect => {
  let noticeText = '';
  let noticeClass = '';

  switch (isCorrect) {
    case true:
      noticeText = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('You answered correctly!');
      noticeClass = 'correct';
      break;

    case false:
      noticeText = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__["__"])('That is the wrong answer!');
      noticeClass = 'incorrect';

    default:
      break;
  }

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: `answer-notice ${noticeClass}`
  }, " ", noticeText, " ");
};
const getRawOptions = choices => {
  const options = choices.map(choice => {
    return choice[0];
  });
  return options;
};
const getComponentOptions = options => {
  const componentOptions = options.map((option, index) => {
    const value = option === '' ? `empty-${index}` : option;
    return {
      label: option,
      value: value
    };
  });
  return componentOptions;
};
const getRightAnswers = choices => {
  if (typeof choices !== 'object') {
    return;
  }

  const rightAnswers = [];

  for (let i in choices) {
    if (choices[i][1]) {
      rightAnswers.push(choices[i][0]);
    }
  }

  return rightAnswers;
};
const compareAnswers = (userAnswer, rightAnswer) => {
  const lengthIsEqual = userAnswer.length === rightAnswer.length;
  const typeIsEqual = typeof rightAnswer === typeof userAnswer;

  if (!typeIsEqual || !lengthIsEqual) {
    return false;
  }

  if (typeof rightAnswer === 'string' || typeof rightAnswer === 'boolean' || typeof rightAnswer === 'number') {
    return rightAnswer === userAnswer;
  }

  if (typeof rightAnswer === 'object') {
    for (let i in userAnswer) {
      const answerExists = rightAnswer.indexOf(userAnswer[i]);

      if (answerExists === -1) {
        return false;
      } else {
        rightAnswer.splice(answerExists, 1);
      }
    }

    return true;
  }

  return false;
};

/***/ }),

/***/ 0:
/*!*******************************!*\
  !*** multi ./src/frontend.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/frontend.js */"./src/frontend.js");


/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["apiFetch"]; }());

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["components"]; }());

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["element"]; }());

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["i18n"]; }());

/***/ })

/******/ });
//# sourceMappingURL=frontend.js.map