"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseProcessor = void 0;
class BaseProcessor {
  process(t) {
    Array.isArray(t)
      ? t.map((el) => this.processEntity(el))
      : this.processEntity(t);
    return t;
  }
}
exports.BaseProcessor = BaseProcessor;
//# sourceMappingURL=base.processor.js.map
