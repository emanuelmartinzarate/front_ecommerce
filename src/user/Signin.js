import React, {useState} from 'react'
import Layout from '../core/Layout'
import { signin, authenticate } from '../auth'
import { Redirect } from 'react-router-dom'

const Signin = () => {
    const [values, setValues] = useState({
        email:'',
        password:'',
        error:'',
        loading: false,
        redirectToReferrer: false
    })

    const {email, password, loading, error, redirectToReferrer} = values

    const handleChange = name => event => {
        setValues({...values,error:false, [name]: event.target.value})
    }

    const clickSubmit = (event) =>{
        event.preventDefault()
        setValues({...values,error:false, loading: true})
        signin({email, password})
            .then(data => {
                if(data.error){
                    setValues({...values, error: data.error, loading: false})
                }else{
                    authenticate(data, ()=> {
                        setValues({
                            ...values,
                            redirectToReferrer: true
                        })
                    })
                }
            })
    }

    const signInForm = () => (
            <form>
                <div className='form-group'>
                    <label className='text-muted'>Email</label>
                    <input 
                        onChange={handleChange('email')} 
                        type='email' 
                        className='form-control' 
                        value={email}
                    />
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Password</label>
                    <input 
                        onChange={handleChange('password')} 
                        type='password' 
                        className='form-control'
                        value={password} 
                    />
                </div>
                <br />
                <button 
                    className="btn btn-primary"
                    onClick={clickSubmit}
                >
                    Submit
                </button>
            </form>
    )

    const showError = () => (
        <div className='alert alert-danger' style={{display: error? '': 'none'}}>
            {error}
        </div>
    )

    const showLoading = () => loading && (
        <div className='alert alert-info'>
            Loading...
        </div>
    )

    const redirectUser = () => {
        if(redirectToReferrer){
            return <Redirect to='/' />
        }
    }

    return (
        <Layout 
            title='Signin' 
            description='Signin to Node React E-commerce App'
            className='container'
        >
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
        </Layout>
    )
}

export default Signin