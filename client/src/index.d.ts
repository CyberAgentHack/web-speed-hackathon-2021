declare namespace Models {
  interface User {
    createdAt: string;
    description: string;
    id: string;
    name: string;
    password: string;
    posts: Array<Models.Post>;
    profileImage: Models.ProfileImage;
    username: string;
  }

  interface ProfileImage {
    alt: string;
    id: string;
  }

  interface Post {
    createdAt: string;
    id: string;
    images: Array<Models.Image>;
    movie: Models.Movie;
    sound: Models.Sound;
    text: string;
    user: Models.User;
  }

  interface Image {
    alt: string;
    id: string;
  }

  interface Sound {
    artist: string;
    id: string;
    title: string;
  }

  interface Movie {
    id: string;
  }

  interface Comment {
    createdAt: string;
    id: string;
    post: Models.Post;
    text: string;
    user: Models.User;
  }
}
