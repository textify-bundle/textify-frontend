import PagesTree from "../../shared/ui/pages-tree/PagesTree";
import ActionBar from "../../widgets/header/action-bar/ActionBar";
import { supabase } from "../../utils/client";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import NewSearch from "../../shared/ui/search/NewSearch";

interface TreeItem {
  name: string;
  type: 'link' | 'action' | 'dropdown';
  link?: string;
  action?: string;
  icon?: string;
  items?: TreeItem[];
}

const LayoutWrapper = () => {
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newTree, setNewTree] = useState<TreeItem[]>([]);

  useEffect(() => {
    const fetchUserAndProjects = async () => {
      setIsLoading(true);

      try {
        const { data: userData } = await supabase.auth.getUser();
        setUserEmail(userData.user?.email);

        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*');

        if (projectsError) {
          console.error("Ошибка при получении проектов:", projectsError);
          return;
        }

        const { data: pagesData, error: pagesError } = await supabase
          .from('project')
          .select('*');

        if (pagesError) {
          console.error("Ошибка при получении страниц:", pagesError);
          return;
        }

        const treeStructure = projectsData.map((project: any) => {
          const projectPages = pagesData.filter((page: any) => page.project_id === project.id);
          
          const projectItem: TreeItem = {
            name: project.project_name,  
            type: 'dropdown',
            link: `/project/${project.id}`,
            items: projectPages.map((page: any) => ({
              name: page.title,  
              type: 'link',
              link: `/project/${project.id}/page/${page.id}`,
            })),
          };

          return projectItem;
        });

        setNewTree([
          {
            name: 'Главная',
            type: 'link',
            link: '/main',
          },
          {
            name: 'Корзина',
            type: 'link',
            link: '/trash',
          },
          {
            name: 'Создать проект',
            type: 'action',
            action: 'create',
            icon: 'plus',
          },
          ...treeStructure,
        ]);

      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndProjects();
  }, []);

  const users = [
    {
      id: '1',
      name: 'Oleg',
    },
    {
      id: '2',
      name: 'Oleg',
    },
    {
      id: '3',
      name: 'Oleg',
    },
  ];

  if (isLoading) {
    return (
      <div>
        <CircularProgress sx={{ position: 'absolute', left: '47vw', top: '45vh' }} size={24} color="inherit" />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', fontFamily: "Varela Round, serif" }}>
      <div style={{ background: '#F8F7F5', height: '100dvh', width: '260px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginInline: 15, marginTop: 15, fontSize: 12, height: ""}}>
          <img
            style={{ borderRadius: '40px', width: '28px', height: '28px', marginRight: 10, backgroundColor: "#0751D8" }}
            src="https://sm.ign.com/t/ign_nordic/review/p/persona-5-/persona-5-review_htue.1280.jpg"
          />
          {userEmail}
        </div>
        <div style={{ marginInline: 8, marginTop: 20 }}>
          <NewSearch />
        </div>
        <PagesTree tree={newTree} />
      </div>
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <div style={{ width: '380px' }}>
            <ActionBar users={users} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutWrapper;
