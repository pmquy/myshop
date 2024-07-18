const products = [
  {
    _id: 0,
    recommendations: [
      {
        image: 'https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg',
        option: {
          model: 0,
          'base on': 0
        }
      },
      {
        image: 'https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg',
        option: {
          model: 1,
          'base on': 1
        }
      },
    ],
    option: {
      model: [
        {
          name: 'ACX Mesh',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png',
          price: 1
        },
        {
          name: 'ACX Light',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png',
          price: 2
        },
        {
          name: 'ACX Soft',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png',
          price: 3
        }
      ],
      'base on': [
        {
          name: 'hard castors, braked, for carpet',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png',
          price: 2
        },
        {
          name: 'soft castors, braked, for hard floor',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png',
          price: 4,
        }
      ]
    },
    name: 'ACX Mesh',
    description: 'ACX Mesh differs from the two other models in the task chair family ACX Light und Soft in that its backrest has a knitted fabric cover. This semi-transparent mesh textile is made of recycled polyester and comes in a choice of seven colours which combined with either a dark or light frame enables numerous variants. The seat cover can be selected in a complementary knitted fabric or in the textile Plano.',
    category: 'Chairs',
    room: 'Home Office',
    designer: 'Antonio Citterio',
    price: 990.00,
    avatar: 'https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg',
    images: ['https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg', 'https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg', 'https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg', 'https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg']
  },
  {
    _id: 1,
    recommendations: [
      {
        image: 'https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg',
        option: {
          model: 0,
          'base on': 0
        }
      },
      {
        image: 'https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg',
        option: {
          model: 1,
          'base on': 1
        }
      },
    ],
    option: {
      model: [
        {
          name: 'ACX VIP',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png',
          price: 1
        },
        {
          name: 'ACX Light',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png',
          price: 2
        },
        {
          name: 'ACX Soft',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png',
          price: 3
        }
      ],
      'base on': [
        {
          name: 'hard castors, braked, for carpet',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png',
          price: 2
        },
        {
          name: 'soft castors, braked, for hard floor',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png',
          price: 4,
        }
      ]
    },
    name: 'ACX VIP',
    description: 'ACX Mesh differs from the two other models in the task chair family ACX Light und Soft in that its backrest has a knitted fabric cover. This semi-transparent mesh textile is made of recycled polyester and comes in a choice of seven colours which combined with either a dark or light frame enables numerous variants. The seat cover can be selected in a complementary knitted fabric or in the textile Plano.',
    category: 'Chairs',
    room: 'Home Office',
    designer: 'Antonio Citterio',
    price: 1000.00,
    avatar: 'https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg',
    images: ['https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg', 'https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg', 'https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg', 'https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg']
  },
  {
    _id: 2,
    recommendations: [
      {
        image: 'https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg',
        option: {
          model: 0,
          'base on': 0
        }
      },
      {
        image: 'https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg',
        option: {
          model: 1,
          'base on': 1
        }
      },
    ],
    option: {
      model: [
        {
          name: 'ACX Mesh',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png',
          price: 1
        },
        {
          name: 'ACX Light',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png',
          price: 2
        },
        {
          name: 'ACX Soft',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png',
          price: 3
        }
      ],
      'base on': [
        {
          name: 'hard castors, braked, for carpet',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png',
          price: 2
        },
        {
          name: 'soft castors, braked, for hard floor',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png',
          price: 4,
        }
      ]
    },
    name: 'ACX Mesh',
    description: 'ACX Mesh differs from the two other models in the task chair family ACX Light und Soft in that its backrest has a knitted fabric cover. This semi-transparent mesh textile is made of recycled polyester and comes in a choice of seven colours which combined with either a dark or light frame enables numerous variants. The seat cover can be selected in a complementary knitted fabric or in the textile Plano.',
    category: 'Chairs',
    room: 'Meeting',
    designer: 'Antonio Citterio',
    price: 990.00,
    avatar: 'https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg',
    images: ['https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg', 'https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg', 'https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg', 'https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg']
  },
  {
    _id: 3,
    recommendations: [
      {
        image: 'https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg',
        option: {
          model: 0,
          'base on': 0
        }
      },
      {
        image: 'https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg',
        option: {
          model: 1,
          'base on': 1
        }
      },
    ],
    option: {
      model: [
        {
          name: 'ACX Mesh',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png',
          price: 1
        },
        {
          name: 'ACX Light',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png',
          price: 2
        },
        {
          name: 'ACX Soft',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png',
          price: 3
        }
      ],
      'base on': [
        {
          name: 'hard castors, braked, for carpet',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png',
          price: 2
        },
        {
          name: 'soft castors, braked, for hard floor',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png',
          price: 4,
        }
      ]
    },
    name: 'ACX Mesh',
    description: 'ACX Mesh differs from the two other models in the task chair family ACX Light und Soft in that its backrest has a knitted fabric cover. This semi-transparent mesh textile is made of recycled polyester and comes in a choice of seven colours which combined with either a dark or light frame enables numerous variants. The seat cover can be selected in a complementary knitted fabric or in the textile Plano.',
    category: 'Chairs',
    room: 'Meeting',
    designer: 'Antonio Citterio',
    price: 990.00,
    avatar: 'https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg',
    images: ['https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg', 'https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg', 'https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg', 'https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg']
  },
  {
    _id: 4,
    recommendations: [
      {
        image: 'https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg',
        option: {
          model: 0,
          'base on': 0
        }
      },
      {
        image: 'https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg',
        option: {
          model: 1,
          'base on': 1
        }
      },
    ],
    option: {
      model: [
        {
          name: 'ACX Mesh',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png',
          price: 1
        },
        {
          name: 'ACX Light',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png',
          price: 2
        },
        {
          name: 'ACX Soft',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png',
          price: 3
        }
      ],
      'base on': [
        {
          name: 'hard castors, braked, for carpet',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png',
          price: 2
        },
        {
          name: 'soft castors, braked, for hard floor',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png',
          price: 4,
        }
      ]
    },
    name: 'ACX Mesh',
    description: 'ACX Mesh differs from the two other models in the task chair family ACX Light und Soft in that its backrest has a knitted fabric cover. This semi-transparent mesh textile is made of recycled polyester and comes in a choice of seven colours which combined with either a dark or light frame enables numerous variants. The seat cover can be selected in a complementary knitted fabric or in the textile Plano.',
    category: 'Airport seating',
    room: 'Meeting',
    designer: 'Antonio Citterio',
    price: 990.00,
    avatar: 'https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg',
    images: ['https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg', 'https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg', 'https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg', 'https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg']
  },
  {
    _id: 5,
    recommendations: [
      {
        image: 'https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg',
        option: {
          model: 0,
          'base on': 0
        }
      },
      {
        image: 'https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg',
        option: {
          model: 1,
          'base on': 1
        }
      },
    ],
    option: {
      model: [
        {
          name: 'ACX Mesh',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png',
          price: 1
        },
        {
          name: 'ACX Light',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png',
          price: 2
        },
        {
          name: 'ACX Soft',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png',
          price: 3
        }
      ],
      'base on': [
        {
          name: 'hard castors, braked, for carpet',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png',
          price: 2
        },
        {
          name: 'soft castors, braked, for hard floor',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png',
          price: 4,
        }
      ]
    },
    name: 'ACX Mesh',
    description: 'ACX Mesh differs from the two other models in the task chair family ACX Light und Soft in that its backrest has a knitted fabric cover. This semi-transparent mesh textile is made of recycled polyester and comes in a choice of seven colours which combined with either a dark or light frame enables numerous variants. The seat cover can be selected in a complementary knitted fabric or in the textile Plano.',
    category: 'Airport seating',
    room: 'Meeting',
    designer: 'Antonio Citterio',
    price: 990.00,
    avatar: 'https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg',
    images: ['https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg', 'https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg', 'https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg', 'https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg']
  },
  {
    _id: 6,
    recommendations: [
      {
        image: 'https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg',
        option: {
          model: 0,
          'base on': 0
        }
      },
      {
        image: 'https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg',
        option: {
          model: 1,
          'base on': 1
        }
      },
    ],
    option: {
      model: [
        {
          name: 'ACX Mesh',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png',
          price: 1
        },
        {
          name: 'ACX Light',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png',
          price: 2
        },
        {
          name: 'ACX Soft',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png',
          price: 3
        }
      ],
      'base on': [
        {
          name: 'hard castors, braked, for carpet',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png',
          price: 2
        },
        {
          name: 'soft castors, braked, for hard floor',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png',
          price: 4,
        }
      ]
    },
    name: 'ACX Mesh',
    description: 'ACX Mesh differs from the two other models in the task chair family ACX Light und Soft in that its backrest has a knitted fabric cover. This semi-transparent mesh textile is made of recycled polyester and comes in a choice of seven colours which combined with either a dark or light frame enables numerous variants. The seat cover can be selected in a complementary knitted fabric or in the textile Plano.',
    category: 'Chairs',
    room: 'Home Office',
    designer: 'Antonio Citterio',
    price: 990.00,
    avatar: 'https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg',
    images: ['https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg', 'https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg', 'https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg', 'https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg']
  },
  {
    _id: 7,
    recommendations: [
      {
        image: 'https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg',
        option: {
          model: 0,
          'base on': 0
        }
      },
      {
        image: 'https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg',
        option: {
          model: 1,
          'base on': 1
        }
      },
    ],
    option: {
      model: [
        {
          name: 'ACX Mesh',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png',
          price: 1
        },
        {
          name: 'ACX Light',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png',
          price: 2
        },
        {
          name: 'ACX Soft',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png',
          price: 3
        }
      ],
      'base on': [
        {
          name: 'hard castors, braked, for carpet',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png',
          price: 2
        },
        {
          name: 'soft castors, braked, for hard floor',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png',
          price: 4,
        }
      ]
    },
    name: 'ACX Mesh',
    description: 'ACX Mesh differs from the two other models in the task chair family ACX Light und Soft in that its backrest has a knitted fabric cover. This semi-transparent mesh textile is made of recycled polyester and comes in a choice of seven colours which combined with either a dark or light frame enables numerous variants. The seat cover can be selected in a complementary knitted fabric or in the textile Plano.',
    category: 'Accessories',
    room: 'Focus',
    designer: 'Alberto Meda',
    price: 990.00,
    avatar: 'https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg',
    images: ['https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg', 'https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg', 'https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg', 'https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg']
  },
  {
    _id: 8,
    recommendations: [
      {
        image: 'https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg',
        option: {
          model: 0,
          'base on': 0
        }
      },
      {
        image: 'https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg',
        option: {
          model: 1,
          'base on': 1
        }
      },
    ],
    option: {
      model: [
        {
          name: 'ACX Mesh',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png',
          price: 1
        },
        {
          name: 'ACX Light',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png',
          price: 2
        },
        {
          name: 'ACX Soft',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png',
          price: 3
        }
      ],
      'base on': [
        {
          name: 'hard castors, braked, for carpet',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png',
          price: 2
        },
        {
          name: 'soft castors, braked, for hard floor',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png',
          price: 4,
        }
      ]
    },
    name: 'ACX Mesh',
    description: 'ACX Mesh differs from the two other models in the task chair family ACX Light und Soft in that its backrest has a knitted fabric cover. This semi-transparent mesh textile is made of recycled polyester and comes in a choice of seven colours which combined with either a dark or light frame enables numerous variants. The seat cover can be selected in a complementary knitted fabric or in the textile Plano.',
    category: 'Accessories',
    room: 'Focus',
    designer: 'Alberto Meda',
    price: 990.00,
    avatar: 'https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg',
    images: ['https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg', 'https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg', 'https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg', 'https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg']
  },
  {
    _id: 9,
    recommendations: [
      {
        image: 'https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg',
        option: {
          model: 0,
          'base on': 0
        }
      },
      {
        image: 'https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg',
        option: {
          model: 1,
          'base on': 1
        }
      },
    ],
    option: {
      model: [
        {
          name: 'ACX Mesh',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png',
          price: 1
        },
        {
          name: 'ACX Light',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png',
          price: 2
        },
        {
          name: 'ACX Soft',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png',
          price: 3
        }
      ],
      'base on': [
        {
          name: 'hard castors, braked, for carpet',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png',
          price: 2
        },
        {
          name: 'soft castors, braked, for hard floor',
          image: 'https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png',
          price: 4,
        }
      ]
    },
    name: 'ACX Mesh',
    description: 'ACX Mesh differs from the two other models in the task chair family ACX Light und Soft in that its backrest has a knitted fabric cover. This semi-transparent mesh textile is made of recycled polyester and comes in a choice of seven colours which combined with either a dark or light frame enables numerous variants. The seat cover can be selected in a complementary knitted fabric or in the textile Plano.',
    category: 'Accessories',
    room: 'Focus',
    designer: 'Alberto Meda',
    price: 990.00,
    avatar: 'https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg',
    images: ['https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg', 'https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg', 'https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg', 'https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg']
  },
]

class Api {
  get = query => {
    return new Promise(resolve => resolve(products.filter(product => Object.keys(query).every(key => !query[key].length || query[key].includes(product[key])))))
  }

  findOne = async query => {
    return products.filter(e => Object.keys(query).every(key => query[key] == e[key]))[0]
  }

  getById = async id => {
    return products.filter(e => e._id == id)
  }
}

export default new Api()