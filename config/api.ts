const BASE_URL = 'https://api.sparklin.ai/api';

export const apiRoutes = {
  user: '/user',
  googleLogin: '/auth/google/login',
  linkedInLogin: '/auth/lin/login',
  updatePersona: '/user/persona',
  fetchpersona: '/user/persona',
  quickPost: '/user/quick-post',
  saveToUserLibrary: '/user/lib-create',
  sparkPost: '/user/spark-post',
  createPost: '/user/lib-create',
  updateLibraryPost: '/user/lib-update',
  connectLinkedIn: '/user/lin/connect',
  fetchuserlibrary: '/user/lib',
  tailoredPosts: '/user/tailored-posts',
  seedIdeas: '/user/seed-ideas',
  seedContent: '/user/seed-content',
  viralsByCategory: (category: string) => `/user/virals/${category}`,
  inspiration: '/user/virals',
  getTopics: '/user/get-topics',
  getContentByTopic: '/user/get-content',
  login: '/login'
};

export const pageRoutes = {
  home: '/',
  dashboard: '/dashboard'
};

export const api = {
  url: (path: string, params: Record<string, string> = {}) => {
    let url = `${BASE_URL}${path}`;
    const queryParams = new URLSearchParams(params).toString();
    if (queryParams) {
      url += `?${queryParams}`;
    }
    return url;
  }
};
