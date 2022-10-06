import TextInput from "../../components/General/TextInput"
import { useState, useEffect } from 'react';
import { useAuthLoginMutation } from '../../store/services/authService';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdminToken } from '../../store/reducers/authReducer';

function AdminLogin() {
  const [loginState, setLoginState] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputs = e => {
    setLoginState({...loginState, [e.target.name]: e.target.value })
  }

  const [login, response] = useAuthLoginMutation();
  const errors = response?.error?.data.errors ? response?.error?.data.errors : []; 
  console.log('my response', response);
  
  const adminLoginFunction = e => {
    e.preventDefault();
    login(loginState);
  }

  useEffect(() => {
    if(response.isSuccess) {
      localStorage.setItem('admin-token', response?.data?.token);
      dispatch(setAdminToken(response?.data?.token));
      // redirect to this route
      navigate('/dashboard/products');
    }
  }, [response.isSuccess, dispatch, navigate, response?.data?.token])

  return (
    <div className="h-screen bg-slate-100 flex justify-center items-center flex-col font-primary">
      <div className="mb-10">
        <h1 className="text-5xl font-semibold">Sign In</h1>
      </div>
      <div className="bg-white w-11/12 sm:w-10/12 md:w-8/12 lg:w-4/12 lg:p-10 rounded-lg p-5">
        <form onSubmit={adminLoginFunction}>
          {
            errors.length > 0 && errors.map((error, errId) => {
              return (
                <div key={errId}>
                    <p className="text-red-500">{error.msg}</p>
                </div>
              )
            })
          }
          <TextInput 
            labelText="Email Address" 
            inputType="email"
            inputName="email"
            inputPlaceholder="johndoe@gmail.com" 
            changeEvent={handleInputs}
            inputValue={loginState.email}
          />
          <TextInput 
            labelText="Password" 
            inputType="password"
            inputName="password"
            inputPlaceholder="must be atleast 5 characters long"
            changeEvent={handleInputs} 
            inputValue={loginState.password}
          />
          <div className="mt-8">
              <input 
                type="submit" 
                value={response.isLoading ? 'Loading...' : 'Sign In'} 
                className="bg-primary text-white w-full px-4 py-2 rounded cursor-pointer hover:bg-blue-600" 
              />
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin