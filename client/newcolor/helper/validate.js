const validate = (template, val) => {
  const pattern = /^[a-f0-9]{6}$/;

  let badRowNum = 0;
  let emptyRowNum = 0;
  const uniq = {
    dup: template.length
  };

  val.forEach((v, k) => {
    if (!pattern.test(v)) {
      badRowNum += 1;
    } else if (v === template[k]) {
      emptyRowNum += 1;
    }
    if (typeof uniq[v] === 'undefined') {
      uniq[v] = true;
      uniq.dup -= 1;
    }
  })

  return [
    uniq.dup + badRowNum + emptyRowNum === 0,
    {
      badRowNum,
      emptyRowNum,
      dup: uniq.dup
    }];
};

export default validate;
