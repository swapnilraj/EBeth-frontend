/**
 * Render one of two components based on the predicate
 * @param predicate condition to check for rendering
 * @param ifComp component to render predicate is true
 * @param elseComp component to render if predicate is false
 */
export const renderIf = (predicate: boolean, ifComp: JSX.Element, elseComp: JSX.Element) =>
predicate ? ifComp : elseComp;
