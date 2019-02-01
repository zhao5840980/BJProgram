<template>
  <div class="shopping-cart">
    <TopHead title="保定惠友超市连锁">
      <span slot="r">编辑</span>
    </TopHead>
    <shopCardMsg v-for="(item,index) in productList" :src="item.img_src" :title="item.info_title" :warehouse="warehouse" :price="item.totalNum" :key="index">
      <CheckBtn @ChangeSelect="getshopingCartUpdate" slot="l" :index="item.id" :ischecked="item.selected"></CheckBtn>
      <ProductNum @ChnageProductNum="AgainRecount" slot="r" :repertory="item.productNum" :totalnum="item.stock" :productid="item.id"></ProductNum>

    </shopCardMsg>
    <div class="total-price">
      <div class="total-price-l">
        <div class="total">

          <check-btn :ischecked="state"></check-btn>

          <span class="totalSelect">全选</span>
        </div>
        <div class="total-price-num">
          <span class="total-text">合计：</span>
          <span class="total-color">{{totalsummiton}}元</span>
        </div>

      </div>
      <div class="total-price-r">

        <div class="confirm-btn" @click="TosubmitOrder">确认</div>
      </div>

    </div>

  </div>
</template>

<script>
import TopHead from '../../components/TopHead';
import ShopCardMsg from '../../components/zzz/ShopCardMsg';
import CheckBtn from '../../components/zzz/CheckBtn';

import ProductNum from '../../components/zzz/ProductNum';
// import service from '../../service/service.js';

export default {
  name: 'shopping-cart',
  data() {
    return {
      productList: [],
      warehouse: '7041-新宝孙俪那',
      totalsummiton: 0,
      numstate: false,
      allstate: true,
      shoppingcartlist: [],
      state: true
      // cliked: false,
    };
  },
  // watch: {
  //   numstate:function(){

  //   }
  // },
  components: {
    TopHead,
    ShopCardMsg,
    CheckBtn,
    ProductNum
  },
  created: function() {
    this.GetProductList();
  },
  methods: {
    GetProductList() {
      //点击加入购物车时需要将当前商品存到vueX中数组进行保存
      // console.log(mapState);
      //获取vuex中存储的商品
      console.log(this.$store.getters.getShoppingCart);
      this.productList = this.$store.getters.getShoppingCart;
      let product = JSON.parse(localStorage.getItem('shoppingproduct'));
      console.log(this.shoppingcartlist);
      this.AddToShoppingCart();
      this.getSummion();
      this.SubmitShoopingCart(product);
    },
    AddToShoppingCart() {
      //获取当前页面的商品，添加到
      this.productList.forEach(item => {
        item.ischecked = true;
        item.totalNum = item.price * item.productNum;
        item.checked = true;
      });
      console.log(this.productList);
    },
    getSummion() {
      let summion = 0;
      this.productList.forEach(item => {
        summion += item.totalNum;
      });
      this.totalsummiton = summion;
    },
    SubmitShoopingCart(arr) {
      //存储当前的购物车里面的数据到vueX中
      // this.productList.forEach(item => {
      //   this.$store.commit('AddShoppingCar', item);
      // });
      // this.$store.commit('AddShoppingCar', arr);
      this.$store.commit('AddShoppingCar', arr);
      // this.$router.push('/home/submitorder');
    },
    AgainRecount(obj) {
      //获取修改完的商品数量和id
      //修改当前购物车中的商品信息
      this.productList.forEach(item => {
        if (item.id == obj.id) {
          item.productNum = obj.num;
        }
      });
      this.AddToShoppingCart();
      this.getSummion();
    },
    ChangeNumState() {
      this.numstate = true;
    },
    getshopingCartUpdate(obj) {
      // console.log('开始保存到vuex中');
      //先判断是选中还是未选中，选中，就进行添加，未选中执行下面的操作
      if (obj.cliked) {
        //执行添加到carlist中
        //首先从当前的购物车列表中获取当前id的商品
        console.log(obj.cliked);
        console.log(this.productList);
        // this.$store.getters.getShoppingCar.forEach(item => {
        //   if (item.id == obj.id) {
        //     item.selected = true;
        //   }
        // });
        this.productList.forEach(item => {
          if (obj.id == item.id) {
            //执行添加操作
            item.selected = true;
            this.$store.commit('AddShoppingCar', item);
          }
        });
      } else {
        //根据传过来的obj修改carlist中的selected状态并从carlist中进行移除
        this.$store.commit('PopShoppingCarList', obj.id);
      }
    },
    getChangeAllState(bool) {
      console.log('gaibian');
      this.state = bool;
    },
    TosubmitOrder() {
      this.$router.push('/home/submitorder');
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.total-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: px2rem(110);

  width: 100%;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #cccccc;
  padding: 0 px2rem(26) 0 px2rem(26);
  .total-price-l {
    width: px2rem(406);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .total {
      display: flex;
      justify-content: space-between;
      width: px2rem(90);
      font-size: px2rem(24);

      .totalSelect {
        display: inline-block;
        margin-left: px2rem(14);
        line-height: px2rem(26);
      }
    }
    .total-price-num {
      line-height: px2rem(100);
      font-size: px2rem(24);
      .total-color {
        color: red;
      }
    }
  }
  .total-price-r {
    .confirm-btn {
      width: px2rem(168);
      height: px2rem(70);
      border-radius: px2rem(6);
      font-size: px2rem(30);
      color: #ffffff;
      background-color: #10903d;
      line-height: px2rem(70);
      text-align: center;
    }
  }
}
</style>
