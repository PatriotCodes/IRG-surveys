const SEP = ';';
export const CHECKED = 1;
export const UNCHECKED = 0;

export default answers => {
  let builder = '';

  for (let i = 0; i < answers.length; i++) {
    const a = answers[i];

    switch (a.type.toString()) {
      case '0':
        for (let j = 0; j < a.answers.length; j++) {
          let checkedFlag = false;
          if (a.answers[j] === CHECKED) {
            builder = builder.concat(`"${j + 1}"${SEP}`);
            checkedFlag = true;
          }
          if (j === a.answers.length < 1 && !checkedFlag) {
            builder = builder.concat(`""${SEP}`);
          }
        }
        break;
      case '1':
        for (let j = 0; j < a.answers.length; j++) {
          if (a.answers[j] === CHECKED) {
            builder = builder.concat(`1${SEP}`);
          } else {
            builder = builder.concat(`0${SEP}`);
          }
        }
        break;
      case '2':
        // TODO: wrap into "" when empty string
        builder = builder.concat(`${a.answers[0]}${SEP}`);
        break;
    }
  }
  return builder;
};
