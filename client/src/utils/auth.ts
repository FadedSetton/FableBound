export const getToken = (): string | null => localStorage.getItem('id_token');

export const loggedIn = (): boolean => !!getToken();

export const logout = (): void => {
    localStorage.removeItem('id_token');
}