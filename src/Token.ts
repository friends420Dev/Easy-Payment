export const Token = {
  saveToken: (user: any, token: any) => {
    setToken(token)
    // setUserID(user.id);
    // storeName(user.name);
    // storeEmail(user.email);
    // storeProfilePhoto(user.profile_photo);
  },
  getToken: () => {
    return getToken()
  },
  getUserID: () => {
    return getUserID()
  },
  getName: () => {
    return getName()
  },
  // storeName: (name: any) => {
  //     return storeName(name);
  // },
  getEmail: () => {
    return getEmail()
  },
  // storeEmail: (email: any) => {
  //     return storeEmail(email);
  // },
  getProfilePhoto: () => {
    return getProfilePhoto()
  },
  isLoggedIn: () => {
    if (getToken()) {
      return true
    }
    return false
  },
  clearStorage: () => {
    return localStorage.clear()
  },
}

export const setToken = (token: any) => {
  localStorage.setItem('token', JSON.stringify(token.token))
  localStorage.setItem('user', JSON.stringify(token.userInfo))
}

export const getToken = () => {
  let tok: any = localStorage.getItem('token')

  return JSON.parse(tok)
}

export const isLoggedIn = () => {
  if (getToken()) {
    return true
  }
  return false
}
export const checkError = (code: any) => {

  return false
}
// const setUserID = (user_id: any) => {
//     localStorage.setItem('user_id', user_id);
// }

export const getUserID = () => {
  let userInfo: any = localStorage.getItem('user')
  userInfo = JSON.parse(userInfo)
  return userInfo
}

// export const storeName = (name: any) => {
//     localStorage.setItem('name', name);
// }

export const getName = () => {
  let userInfo: any = localStorage.getItem('userInfo')
  userInfo = JSON.parse(userInfo)
  return userInfo ? userInfo.name : userInfo
  // return localStorage.getItem('name');
}

export const getUserAvatarName = () => {
  let userInfo: any = localStorage.getItem('userInfo')
  userInfo = JSON.parse(userInfo)
  return userInfo ? userInfo.avatar_unique_name : userInfo
}

// export const storeEmail = (email: any) => {
//     localStorage.setItem('email', email);
// }

export const getEmail = () => {
  let userInfo: any = localStorage.getItem('userInfo')
  userInfo = JSON.parse(userInfo)
  return userInfo ? userInfo.email : userInfo
  // return localStorage.getItem('email');
}

export const getWalletAmout = () => {
  let userInfo: any = localStorage.getItem('userInfo')
  userInfo = JSON.parse(userInfo)
  return userInfo ? userInfo.wallet_balance : userInfo
  // return localStorage.getItem('email');
}
// export const storeProfilePhoto = (profile_photo: any) => {
//     localStorage.setItem('profile_photo', profile_photo ? profile_photo : '');
// }

export const getProfilePhoto = () => {
  let userInfo: any = localStorage.getItem('userInfo')
  userInfo = JSON.parse(userInfo)
  return userInfo ? userInfo.avatar_image : userInfo
  // return localStorage.getItem('profile_photo');
}
import Apilogin from "./api/ApiLogin"
export const Logout = () => {
  Apilogin.logout().then((res) => {
    if (res.data.success) {
      //console.log(res.data.message)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('loginTime')
      localStorage.removeItem('autoUpdate')
      localStorage.removeItem('onlineUsers')


      localStorage.removeItem("recordsPandingDeposit")
      localStorage.removeItem("recordsDeposit")
      localStorage.removeItem("recordsWithdraws")
      localStorage.removeItem("recordsPandingWithdraws")
    } else {
      console.log(res.statusText)
      localStorage.removeItem('autoUpdate')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('onlineUsers')
      localStorage.removeItem('loginTime')
      localStorage.removeItem("recordsPandingDeposit")
      localStorage.removeItem("recordsDeposit")
      localStorage.removeItem("recordsWithdraws")
      localStorage.removeItem("recordsPandingWithdraws")
    }
  }).catch((err) => {
    console.log(err)
  })
}
export const LogoutStorage = () => {
  localStorage.removeItem('autoUpdate')
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('onlineUsers')
  localStorage.removeItem('loginTime')
  localStorage.removeItem("recordsPandingDeposit")
  localStorage.removeItem("recordsDeposit")
  localStorage.removeItem("recordsWithdraws")
  localStorage.removeItem("recordsPandingWithdraws")
}




