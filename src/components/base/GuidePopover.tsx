import {Button, Popover} from 'antd';
import {TooltipPlacement} from 'antd/lib/tooltip';
import {isEmpty, lowerCase} from 'lodash';
import React from 'react';
import {useIntl} from 'react-intl';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RootState} from 'modules';
import {endGuidePopover, setGuidePopover} from 'modules/core';

type GuidePopoverProps = {
  currentKey: string;
  prevKey?: string;
  nextKey?: string;
  placement: TooltipPlacement;
  children: JSX.Element;
};

function GuidePopover({currentKey, prevKey, nextKey, placement, children}: GuidePopoverProps) {
  const {formatMessage: f} = useIntl();
  const dispatch = useDispatch();
  const guidePopover = useSelector((state: RootState) => state.core.guide_popover, shallowEqual);

  if (guidePopover.key === 'end') {
    return <>{children}</>;
  }

  return (
    <div
      style={{
        display: 'block',
      }}
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <Popover
        placement={placement}
        overlayClassName="guide-popover"
        title={<span>{f({id: `modal.guide.title.${lowerCase(currentKey)}`})}</span>}
        content={
          <div className="guide-popover-content">
            <p>{f({id: `modal.guide.content.${lowerCase(currentKey)}`})}</p>
            {isEmpty(prevKey) === false && (
              <Button
                type="link"
                onClick={e => {
                  prevKey && dispatch(setGuidePopover(prevKey));
                }}
              >
                {f({id: 'modal.guide.prev'})}
              </Button>
            )}
            {isEmpty(nextKey) === false && (
              <Button
                type="link"
                onClick={e => {
                  nextKey && dispatch(setGuidePopover(nextKey));
                }}
              >
                {f({id: 'modal.guide.next'})}
              </Button>
            )}
            <Button
              type="link"
              style={{
                float: 'right',
              }}
              onClick={e => {
                dispatch(endGuidePopover());
              }}
            >
              {f({id: 'modal.guide.end_tour'})}
            </Button>
          </div>
        }
        visible={guidePopover.key === currentKey}
        trigger="click"
      >
        {children}
      </Popover>
    </div>
  );
}

export default GuidePopover;
