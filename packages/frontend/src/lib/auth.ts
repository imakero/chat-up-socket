export const setAuthToken = (token: string): void =>
  localStorage.setItem("chatUpSocketToken", token)

export const getAuthToken = (): string | null =>
  localStorage.getItem("chatUpSocketToken")

export const removeAuthToken = (): void =>
  localStorage.removeItem("chatUpSocketToken")
