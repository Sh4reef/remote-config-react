import { useQuery } from "@tanstack/react-query";
import { Card, List } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import ProjectsModel from "../../../models/projects.model";
import { useNavigate } from "react-router-dom";

const ProjectsList = () => {
  const navigate = useNavigate();
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: ProjectsModel.getProjects,
  });

  return (
    <List
      dataSource={projects}
      rowKey="id"
      renderItem={(item) => (
        <List.Item>
          <Card
            title={item.name}
            actions={[
              <SettingOutlined
                key="setting"
                onClick={() => navigate(`/${item.id}/development/parameters`)}
              />,
            ]}
          />
        </List.Item>
      )}
    />
  );
};

export default ProjectsList;
