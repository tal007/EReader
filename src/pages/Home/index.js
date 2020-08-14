import Footer from '@comp/Footer';
import { useRef } from 'react';
import { Input, Card, Button, PageHeader, Steps } from 'antd';

const { Step } = Steps;

function Dot({ iconDot }) {
  console.log(iconDot);
  const ShowDot = React.cloneElement(iconDot);
  return ShowDot;
}

const Home = () => {
  const inputNode = useRef('');

  function handleClick() {
    console.log(inputNode.current);
    inputNode.current.setState({ value: '' });
  }

  return (
    <div>
      <PageHeader title="Home" />
      <Card title="Input 通过事件清空内容">
        <Input ref={inputNode} placeholder="测试" autoFocus />
        <Button onClick={handleClick}>点击按钮</Button>
      </Card>

      <Steps
        current={1}
        progressDot={(iconDot, props) => <Dot iconDot={iconDot} {...props} />}
      >
        <Step title="Finished" description="This is a description." />
        <Step title="In Progress" description="This is a description." />
        <Step title="Waiting" description="This is a description." />
      </Steps>
      <Footer />
    </div>
  );
};

export default Home;
