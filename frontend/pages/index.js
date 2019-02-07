import Layout from '../components/layout';
import css from '../styles.less';
import Button from 'react-bootstrap/Button';
import FacebookLogin from 'react-facebook-login';

export default () => (
  <Layout>
    <div className="test">Hello World.</div>
    <Button>Bootstrap</Button>
    <i className="far fa-lightbulb" />

    <FacebookLogin
      appId="574897169694887"
      autoLoad={true}
      fields="name,email,picture"
      onClick={()=>console.log("Login clicked")}
      callback={(response)=> console.log("fb login response: ", response)} />
  </Layout>
);
