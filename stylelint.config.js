/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-rational-order",
  ],
  plugins: ["stylelint-order", "stylelint-scss"],
  rules: {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "scss/double-slash-comment-whitespace-inside": "always",
    "selector-class-pattern": null,
    "custom-property-empty-line-before": null,
    "color-hex-length": "long",
    "block-no-empty": null,
  },
};
