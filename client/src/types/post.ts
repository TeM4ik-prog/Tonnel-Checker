interface IPost {
  categoryName: string;
  title: string;
  content: string;
  date: Date | null;
  image: File | null;
}


interface IPostUpdate {
  title: string;
  content: string;
  date: Date | null;
}



