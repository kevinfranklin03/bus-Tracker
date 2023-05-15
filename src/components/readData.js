import { auth, db } from "../../firebase/firebase.config";
import { onValue, ref, set } from '@firebase/database'

function readData() {

    const arr = []

    const starCountRef = ref(db, 'messages/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

     const length = Object.keys(data).length
      for(let i = 0; i < length; i++) {

        arr.push((data[Object.keys(data)[i]]))
      }
    })

    return arr
  }

  export default readData