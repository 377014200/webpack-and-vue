import { tick } from './styleSheet.css?module';

export default {
   name: 'Bloak',

   render: function () {

      return (
         <div>
            <h1 >jsx 好像很好用的样子</h1>
            <h2 class={ tick }>它看起来很不错不是吗?</h2>
         </div>
      );

   }

};