import { tick, stash } from './styleSheet.css?module';
import Single from 'components/single/Single'
console.log( tick, stash)
export default {
   name: 'Bloak',
   data: function () {

      return {
         tick, stash
      };

   },
   render: function () {

      return (
         <div>
            <h1 >jsx 好像很好用的样子</h1>
            <h2 class='stash stash' >它看起来很不错不是吗?</h2>
            <Single />
         </div>
      );

   }

};