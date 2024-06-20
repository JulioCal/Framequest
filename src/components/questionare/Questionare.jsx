import axios from "axios"
import Logo from "../../assets/LogoPagoYa.jpeg"
import {  Button, Form, Row, Col } from "react-bootstrap"
import { useParams, useNavigate} from "react-router-dom"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { ClipLoader } from "react-spinners"
import Basic from '../Plans/PlansBasic'
import Advanced from '../Plans/PlansAdvance'
import Unlimited from '../Plans/PlansUnlimited'
import PasswordStrengthBar from 'react-password-strength-bar';

export default function Questionare() {
    const URL = "https://my.ecwid.com/resellerapi/v1/register?register=y"
    const { code } = useParams();
    const [final, setFinal] = useState(false)
    const [loading, setLoad] = useState(false)    
    const newLocation = useNavigate()
    const [err, setERR] = useState(false)
    const [cer, setCER] = useState(false)
    const [password, setPassword] = useState("")
    const confirmError = 'Both passwords should match'
    const [codeError, setEM] = useState("Given coupon is not available")
    const { 
      register,
      handleSubmit,
      reset,      
      getValues,
      setValue,
      watch,
      formState: { errors, isValid },
    } = useForm({ mode: "onBlur" });

    useEffect(() => {
      let code = getValues("code")
      let text
      if(code){ text = getValues("code").substring(0, 3) }      
      switch(text) {
        case "DEM": setValue("plan", "PAGOYA_FREEDEMO"); break;
        case "PYV": if(Basic.findIndex(c => {return c === code} ) > -1) {setValue("plan", "PAGOYA_VENTURE")} break;
        case "PYB": if(Advanced.findIndex(c => {return c === code} ) > -1) {setValue("plan", "PAGOYA_BUSINESS")} break;
        case "PYU": if(Unlimited.findIndex(c => {return c === code} ) > -1) {setValue("plan", "PAGOYA_BUSINESS")} break;
      }
    },[isValid])

    const RegisterNew = (data,e) => {            
      if(data.plan) {
        setLoad(true)      
          data.name = data.first_name+" "+data.last_name
          delete data.code
          delete data.first_name;
          delete data.last_name;
          delete data.confirmPass;
          data.key = "yicKLiiRazsdTJ4a"//API key
          data.billing = "annual"
          axios.post('/api', data)          
          .then(res => {
            setFinal(true);
            setLoad(false)
          }).catch(err => {
            console.log(err)
            setEM(err.message)
            setLoad(false)
            setCER(true)
          })                    
      } else {setCER(true)}
    }
    
    const planText = () => {
      let text
      if(getValues("code")){
        text = getValues("code").substring(0, 3) 
      }      
      switch(text) {
        case "DEM": return "Demo"
        break;
        case "PYV": return "Basic"
          break;
        case "PYB": return "Advanced"
          break;
        case "PYU": return "Unlimited"
          break;
        default:return "Code not available"
      }
    }
    const getout = () => {
      newLocation('Redirect')
      window.location.replace('https://my.shopsettings.com/p/pagoya?lang=en')
    }
    return(<>
    {loading ? <div className="Loading"><ClipLoader color="#02BD13" size={70} /></div> : null}
  {!final ? <div className="container">
      <Row>
        <img src={Logo} alt="logo image" />
      </Row>
    <Form className="p-3" onSubmit={handleSubmit(RegisterNew)}>      
      <Row className="mb-3 text-center">
        <p>Redeem your code and get your annual access</p>        
      </Row>                
        <Form.Label className="Label">Coupon Code</Form.Label>
        <Form.Control className="form-field mb-2" size="sm" {...register("code")} />
        <Row>
          <Col>
            <Form.Label className="Label">First Name</Form.Label>
            <Form.Control className="form-field mb-2" size="sm" {...register("first_name")} />
          </Col>
          <Col>
            <Form.Label className="Label">Last Name</Form.Label>
            <Form.Control className="form-field mb-2" size="sm" {...register("last_name")} />
          </Col>
        </Row>
        <Form.Label className="Label">Email Address</Form.Label>
        <Form.Control className="form-field mb-2" size="sm" {...register("email", {required: "An email is required",})} />                                                                                      
        <Row>
          <p className="red">{errors.email?.message}</p>
        </Row>
        <Form.Group>
          <Form.Label className="Label">Password</Form.Label>
          <Form.Control className="form-field mb-2" size="sm" type="password" aria-describedby="passwordHelpBlock" {...register("password", {
            onChange: (e) => {setPassword(e.target.value)},
            required: "A password is required",
            minLength: {
            value: 8,
            message: "Password must have at least 8 characters"
          }
          })} />    
          <PasswordStrengthBar password={password} />                
          <Form.Text id="passwordHelpBlock" muted>
            Use 8 or more characters with a mix of letters, numbers & symbols.
          </Form.Text>
            <Row>
              <p className="red">{errors.password?.message}</p>
            </Row>
        </Form.Group>
        <Form.Label className="Label">Confirm Password</Form.Label>
        <Form.Control className="form-field mb-2" size="sm" type="password" {...register("confirmPass", {          
           onBlur: (e) => {                                        
            if (watch('password') != e.target.value) {setERR(true)} else { setERR(false)}
          },        
           })}/> 
          { err ? <Row>
              <p className="red">{confirmError}</p>
          </Row> : null}
      <Row className="row-col mt-3 text-center">        
        <Button type="submit" size="sm" disabled={!isValid || err} className="App-button">Redeem Account</Button>
      </Row>      
      { cer ? <Row className="text-center">
          <p className="red">{codeError}</p>
        </Row> : null}
    </Form>  
  </div>:
    <div className="container">
    <Row className="row-center">
      <img className="image-logo" src={Logo} alt="logo image" />
    </Row>
  <Form className="form-login">    
    <Row className="m-3 mb-0 text-center">
      <h6>Thank you for redeeming <br/> you annual subscription of the </h6>
    </Row>
    <Row>
      <h1 className="m-3 text-center framed">{planText()}<br/>Plan</h1>
    </Row>                
    <Row className="m-3">
        <p className="m-2 mt-0 mb-0">We just sent you your login credentials to the email address you provided.</p>
        <p className="m-2 mt-0 mb-0">Please use those to login and activate your account.</p>
        <p className="m-2 mt-0 mb-0">If you do not see the email in your inbox, please check your spam folder</p>
    </Row>
    <Row className="row-col mt-3 text-center">        
      <p><a className="green" href="https://my.shopsettings.com/p/pagoya?lang=en" >Did you not receive the email?</a></p>
      <Button type="submit" size="sm" onClick={getout} className="App-button">Sign in</Button>            
    </Row>      
  </Form>  
</div>}
  </>)
}