import { FORM_INPUT_TYPES } from '../constants';

const SEP = ';';
export const CHECKED = 1;
export const UNCHECKED = 0;

export default answers => {
  let builder = '';

  for (let i = 0; i < answers.length; i++) {
    const a = answers[i];

    // eslint-disable-next-line
    switch (a.type.toString()) {
      case FORM_INPUT_TYPES.radio:
        let checkedFlag = false;
        for (let j = 0; j < a.answers.length; j++) {
          if (a.answers[j] !== CHECKED && a.answers[j] !== UNCHECKED) {
            builder = builder.concat(`"${a.answers[j]}"${SEP}`);
            checkedFlag = true;
            break;
          }
          if (a.answers[j] === CHECKED) {
            builder = builder.concat(`"${j + 1}"${SEP}`);
            checkedFlag = true;
            break;
          }
          if (j === a.answers.length - 1 && !checkedFlag) {
            builder = builder.concat(`${UNCHECKED}${SEP}`);
            break;
          }
        }
        break;
      case FORM_INPUT_TYPES.checkbox:
        for (let j = 0; j < a.answers.length; j++) {
          if (a.answers[j] === CHECKED || a.answers[j] === UNCHECKED) {
            builder = builder.concat(`${a.answers[j]}${SEP}`);
          } else {
            builder = builder.concat(`"${a.answers[j]}"${SEP}`);
          }
        }
        break;
      case FORM_INPUT_TYPES.text:
        builder = builder.concat(!a.answers[0] ? `""${SEP}` : `"${a.answers[0]}"${SEP}`);
        break;
    }
  }
  return builder;
};
