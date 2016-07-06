export const SELECT_TYPEA = 'SELECT_TYPEA';
export const SELECT_TYPEB = 'SELECT_TYPEB';

export function selectTypeA(id) {
  return { type: SELECT_TYPEA};
}

export function selectTypeB() {
  return { type: SELECT_TYPEB };
}
