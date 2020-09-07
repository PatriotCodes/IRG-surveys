const SEP = ';';
export const CHECKED = 1;
export const UNCHECKED = 0;

export default answers => {
  let builder = '';

  for (let i = 0; i < answers.length; i++) {
    const a = answers[i];

    switch (a.type.toString()) {
      case '0':
        let checkedFlag = false;
        for (let j = 0; j < a.answers.length; j++) {
          if (a.answers[j] === CHECKED) {
            builder = builder.concat(`"${j + 1}"${SEP}`);
            checkedFlag = true;
          }
          if (j === a.answers.length - 1 && !checkedFlag) {
            builder = builder.concat(`${UNCHECKED}${SEP}`);
          }
        }
        break;
      case '1':
        for (let j = 0; j < a.answers.length; j++) {
          if (a.answers[j] === CHECKED) {
            builder = builder.concat(`${CHECKED}${SEP}`);
          } else {
            builder = builder.concat(`${UNCHECKED}${SEP}`);
          }
        }
        break;
      case '2':
        builder = builder.concat(!a.answers[0] ? `""${SEP}` : `${a.answers[0]}${SEP}`);
        break;
    }
  }
  return builder;
};
