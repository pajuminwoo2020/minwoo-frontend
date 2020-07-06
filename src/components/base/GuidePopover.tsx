import {Button, Popover} from 'antd';
import {TooltipPlacement} from 'antd/lib/tooltip';
import {isEmpty, lowerCase} from 'lodash';
import React from 'react';
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
        title={<span>가이드</span>}
        content={
          <div className="guide-popover-content">
            {isEmpty(prevKey) === false && (
              <Button
                type="link"
                onClick={e => {
                  prevKey && dispatch(setGuidePopover(prevKey));
                }}
              >
                이전
              </Button>
            )}
            {isEmpty(nextKey) === false && (
              <Button
                type="link"
                onClick={e => {
                  nextKey && dispatch(setGuidePopover(nextKey));
                }}
              >
                다음
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
              투어 종료
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
