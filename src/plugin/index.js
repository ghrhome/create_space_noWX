import dateFormat from '../filters/date-format'

export default {
  install (Vue, options) {

    Vue.mixin({
      filters: {
        dateFormat
      }
    });

  }
}
