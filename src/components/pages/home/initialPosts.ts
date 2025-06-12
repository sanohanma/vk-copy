// src/pages/home/initialPosts.ts
import { IPost } from '../../../types';

export const initialPosts: IPost[] = [
  {
    author: {
      id: 1,
      avatar:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATkAAAChCAMAAACLfThZAAAAUVBMVEUAAAACAADuxRzxwxrvxhzzyBqmjym2misAAAz3xx12Zin1yhx4ZBzvwyrpwSIAAAPtxSgAAAilkDTzyCy2mTRyYBtvYCrqviGnjTPvyCe0mzQYailYAAABVUlEQVR4nO3cwU7CUBRF0SJtRdEqoiL+/4dqAqLPAeWdmLQmayWdMbjZSZn1NA0AAAAAAAAAAAAAAAAA8Fc2qzqbqQ+ejaftfY3t89QHz0a/bq/ay3XXUx88G33XXlVQ7qTvasIp90251LHcBX9xypUO5dphnHKlQ7n1S/NwXvPaKVc4lrsb/eHtjXKFU7nFecr9plxKudShXKdcNeVS3taUcinlUsqllEspl1IupVxKuZRyKeVSyqWUSymXUi6lXEq5lHIp5VLKpZRLKZdSLqVcSrmUcinlUsqllEspl1IupVxKuZRyKeVSyqWUSymXUi6lXEq5lHIp5VLKpZRLKZfyHX/KdkTquPQy7IZhd9awVK7wtZHz+SxHKFf4scukXBXlUsql+vVp7GusnM3Dwtv+scb+feqDZ6Ny2nW1aRZTn/xfLZQDAAAAAAAAAAAAAAAAoPQBDC0vWpk6FRkAAAAASUVORK5CYII=',
      name: 'National Geographic',
    },
    content: 'Серебряная осень в Сибири.Снимал Евгений Иванов',
    createdAt: '15 минут назад',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbCkSfnUrf2BDCVASLfYCBgxSDFxX0g6Ce7g&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSASqkODc7D-ny_bje8cMKMNnZg6BJExsRNDg&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX3HxkDCVtZrdivin5LDj82tc0eEVleiObSw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE-yyLd4sQZbPQqlQgpwUofJzIMzOSK-JDVQ&s',
    ],
  },
];
