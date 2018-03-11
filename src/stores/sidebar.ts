/**
 * Router actions / reducers
 */

/**
 * Action creator for toggling sidebar collapsed view
 */
interface IToggleSidebarAction {
  type: 'TOGGLE_SIDEBAR';
}
const TOGGLE_SIDEBAR: IToggleSidebarAction['type'] = 'TOGGLE_SIDEBAR';
export const toggleSidebar = (): IToggleSidebarAction => ({
  type: TOGGLE_SIDEBAR,
});

export type SidebarActions = IToggleSidebarAction;

/**
 * Sidebar specific state
 */
export interface ISidebarState {
  isCollapsed: boolean;
}

export const defaultSidebarState: ISidebarState = {
  isCollapsed: true,
};

/**
 * Sidebar reducer
 */
export const sidebar = (state: ISidebarState = defaultSidebarState, action: SidebarActions): ISidebarState => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { ...state, isCollapsed: !state.isCollapsed };
    default:
      return state;
  }
};
