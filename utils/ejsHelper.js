module.exports = {
  isDefined: variable => {
    return typeof variable == 'object' && variable != null;
  }
}
