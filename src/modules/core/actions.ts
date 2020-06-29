import {createAction} from 'typesafe-actions';

/**
 *  Guide Popover
 */

export const SET_GUIDE_POPOVER = 'core/SET_GUIDE_POPOVER';
export const END_GUIDE_POPOVER = 'core/END_GUIDE_POPOVER';

export const setGuidePopover = createAction(SET_GUIDE_POPOVER)<string>();
export const endGuidePopover = createAction(END_GUIDE_POPOVER)();
