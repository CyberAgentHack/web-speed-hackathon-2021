namespace Models {
  interface User {
    id: string;
    username: string;
    name: string;
    description: string;
    password: string;
    posts: Array<Models.Post>;
    profileImage: Models.ProfileImage;
    createdAt: string;
  }

  interface ProfileImage {
    id: string;
    alt: string;
  }

  interface Post {
    id: string;
    text: string;
    user: Models.User;
    images: Array<Models.Image>;
    sound: Models.Sound;
    movie: Models.Movie;
    createdAt: string;
  }

  interface Image {
    id: string;
    alt: string;
  }

  interface Sound {
    id: string;
    title: string;
    artist: string;
  }

  interface Movie {
    id: string;
  }

  interface Comment {
    id: string;
    text: string;
    user: Models.User;
    post: Models.Post;
    createdAt: string;
  }
}
