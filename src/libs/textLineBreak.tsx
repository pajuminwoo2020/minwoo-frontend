import React from 'react';
import {isEmpty, map} from 'lodash';

export const textLineBreak = (lines: string) => {
  return lines
    ? map(lines.split(/[\r\n]/),
      (partial, i) => {
        return isEmpty(partial) === false ? (<span key={i}>
              {partial}
          {i !== lines.length - 1 && <br/>}
            </span>) : <br key={i}/>;
      },
    )
    : lines;
};
