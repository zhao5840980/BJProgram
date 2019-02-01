import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    LoginUser: sessionStorage.getItem('LoginUser')
      ? JSON.parse(sessionStorage.getItem('LoginUser'))
      : null,
    shoppingCart: [],
    // num: 1, //计数组件绑定的值-zh
    carlist: [], //定义数组接收购买商品的对象数据-zh
    shoppingCartList: [],
    allstate: true
  },
  mutations: {
    initUser(state, payload) {
      state.LoginUser = payload;
    },
    AddProduct(state, payload) {
      console.log('执行');
      //在添加之前需要判断当前的数组中是否存在当前商品的ID，若存在，改变当前商品的数量+1

      let onOff = false;
      state.shoppingCart.forEach(item => {
        // console.log(item.id + '' + payload.id);
        if (item.id == payload.id) {
          // console.log(item.id + '' + payload.id);
          item.productNum += payload.productNum;
          onOff = true;
        }
      });
      if (!onOff) {
        state.shoppingCart.push(payload);
      }
      localStorage.setItem('shoppingproduct', JSON.stringify(payload));
    },
    AddShoppingCar(state, payload) {
      //在添加之前需要判断当前的数组中是否存在当前商品的ID，若存在，改变当前商品的数量+1
      // let product = JSON.parse(payload);
      console.log(payload);
      let addProduct = false;
      if (payload.selected == true) {
        if (state.shoppingCartList.length > 0) {
          console.log(1);
          state.shoppingCartList.forEach(item => {
            if (payload.id != item.id) {
              addProduct = true;
            } else {
              addProduct = false;
            }
          });
        } else {
          state.shoppingCartList.push(payload);
        }
        if (addProduct) {
          // console.log(product.id + '-' + item.id);
          state.shoppingCartList.push(payload);
        }
      }
    },

    // state.shoppingCartList = payload;
    // },
    PopShoppingCarList(state, payload) {
      //删除 购物车中的商品
      console.log(typeof payload);
      // if (typeof payload == 'number') {
      //   console.log('删除数组中的数据');
      //   state.shoppingCartList.splice(payload, 1);
      // }
      let id = 0;
      state.shoppingCartList.forEach((item, index) => {
        if (item.id == payload) {
          item.selected = false;
          id = index;
        }
      });
      state.shoppingCartList.splice(id, 1);
    },

    //增加的方法-zh
    // increase(state, maxNum) {
    //   if (state.num >= maxNum) {
    //     return (state.num = maxNum);
    //   }
    //   state.num++;
    // },
    // 减少的方法-zh
    // decrease(state, minNum) {
    //   if (state.num <= minNum) {
    //     return state.num == minNum;
    //   }
    //   state.num--;
    // },
    //点击购物车按钮把选择到的商品数据添加到state中的carlist中-zh
    addToCar(state, productinfo) {
      let flag = false; //设置个flag假设carlist中没有这个商品
      state.carlist.some(item => {
        if (item.id == productinfo.id) {
          //判断id如果存在说明carlist中已经有了这个商品。那么只需要加数量就行了
          item.selectcount += parseInt(productinfo.selectcount);
          flag = true; //为true就代表商品已经存在
          return true;
        }
      });
      if (!flag) {
        //如果循环到最后flag还是false，说明没有添加过这个商品，那么就把商品数据push到carlist中
        state.carlist.push(productinfo);
      }
      // 把添加过的商品数据存放到localstorage中，本地存储
      localStorage.setItem('carlist', JSON.stringify(state.carlist));
    }
  },
  actions: {},
  getters: {
    getLoginUser(state) {
      return state.LoginUser;
    },
    getShoppingCart(state) {
      return state.shoppingCart;
    },
    getcarlist(state) {
      return state.carlist;
    },
    getShoppingCar(state) {
      return state.shoppingCartList;
    },
    getChekBtnMsg(state) {
      let checkBtnMsg = {};
      state.shoppingCart.forEach(item => {
        checkBtnMsg.id = item.id;
        checkBtnMsg.selected = item.selected;
      });
      return checkBtnMsg;
    }
    // getcount(state) {
    // return state.carlist;
    // let obj = {
    //   count: 0,
    //   amount: 0
    // };
    // state.carlist.forEach(item => {
    //   obj.count += item.selectcount;
    //   obj.amount += item.price * item.selectcount;
    // });
    // return obj;
    // }
  }
});
