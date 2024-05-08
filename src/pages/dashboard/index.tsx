import React, { FC } from "react";
import { Button, Card, Col, Flex, Row } from "antd";
import { css } from "@emotion/css";
import { ProcessLine } from "@/pages/common/components/ProcessLine";
import {
  FileTextOutlined,
  CheckCircleFilled,
  ArrowRightOutlined,
} from "@ant-design/icons";

const useStyles = () => {
  return {
    root: css`
      padding: 2rem;
    `,
    container: css`
      min-height: 55vh;
      display: flex;
      align-items: center;
    `,
    card: css`
      padding: 0;
      width: 450px;
      & .ant-card-body {
        padding: 12px 24px;
      }
    `,
    row: css`
      align-items: center;
      gap: 2rem;
    `,
    flex: css`
      gap: 2rem;
      justify-content: space-between;
    `,
    col: css`
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    `,
    docCount: css`
      font-size: 40px;
      margin: 0px 0.5rem;
      color: #ec8460;
      font-weight: 600;
    `,
    bgColor: css`
      background: linear-gradient(to right, #fec774, #ec8460);
    `,
    color: css`
      color: #ec8460;
    `,
    ul: css`
      color: white;
      padding-inline-start: 15px;
    `,
    checked: css`
      margin-right: 0.5rem;
      color: #fec774;
    `,
    arrow: css`
      margin-left: 1rem;
      color: #ec8460;
      font-size: 18px;
    `,
    func: css`
      gap: 1rem;
    `,
  };
};

const funcList = [
  {
    title: "留学文书写作",
    descriptions: ["快速出文章", "快速出文章", "快速出文章"],
  },
  {
    title: "留学文书润色",
    descriptions: ["快速出文章", "快速出文章", "快速出文章"],
  },
  {
    title: "推荐信写作",
    descriptions: ["快速出文章", "快速出文章", "快速出文章"],
  },
  {
    title: "推荐信润色",
    descriptions: ["快速出文章", "快速出文章", "快速出文章"],
  },
];

const DashBoardPage: FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Flex className={styles.flex}>
        <Card className={styles.card}>
          <Row className={styles.row}>
            <Col className={styles.col}>
              <div>
                已生成<span className={styles.docCount}>24</span>
                篇个性化文书
              </div>
              <div>
                已润色<span className={styles.docCount}>24</span>
                篇个性化文书
              </div>
            </Col>
            <Col>
              <ProcessLine
                strokeLinecap={"butt"}
                percent={20}
                type="dashboard"
                gapDegree={50}
                size={120}
              ></ProcessLine>
            </Col>
          </Row>
        </Card>
        <Card className={`${styles.card} ${styles.bgColor}`}>
          <Flex className={styles.flex}>
            <FileTextOutlined width={200} height={200} />
            <div>
              <ul className={`${styles.ul}`}>
                <li>更强大的文书写作功能</li>
                <li>无限修改</li>
                <li>个性化文笔</li>
              </ul>
              <Button className={styles.color}>升级至Perfects.AI pro</Button>
            </div>
          </Flex>
        </Card>
      </Flex>
      <div className={styles.func}>
        <h2>功能进入</h2>
        <Flex className={styles.flex}>
          {funcList.map((card) => (
            <Card
              key={card.title}
              className={styles.card}
              style={{
                width: "auto",
              }}
              title={
                <>
                  {card.title}
                  <FileTextOutlined style={{ marginLeft: "0.3rem" }} />
                </>
              }
            >
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                }}
              >
                {card.descriptions.map((description, index) => (
                  <li key={description}>
                    <CheckCircleFilled className={styles.checked} />
                    {description}
                    {index + 1 === card.descriptions.length && (
                      <ArrowRightOutlined className={styles.arrow} />
                    )}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </Flex>
      </div>
    </div>
  );
};

export default DashBoardPage;
