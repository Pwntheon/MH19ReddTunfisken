import Layout from '../components/layout';
import css from '../styles.less';
import Button from 'react-bootstrap/Button';

export default () => (
  <Layout>
    <div className="test">Hello World.</div>
    <Button>Bootstrap</Button>
    <i className="far fa-lightbulb" />
  </Layout>
);
