import React, { useState, useEffect} from 'react';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primeflex/primeflex.css';
import { nodeServiceImplement } from './service/nodeService'
import { IGroup, IItem } from './types/objectTypes'
import { ListBox } from 'primereact/listbox';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
function App() {
  
  let nodeService = new nodeServiceImplement ()

  const [selectedGroupId, setSelectedGroupId] = useState<string>("group1")
  const [groups, setGroups] = useState<Array<IGroup>>([])
  const [groupItems, setGroupItems] = useState<Array<IItem>>([])
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllData = () => {
    nodeService.getGroups().then( (data) => { setGroups(data) } )
    nodeService.getGroupItems( selectedGroupId ).then( (data) => { setGroupItems(data)})
  }

  useEffect( () => {
    getAllData()
  }, [])

  const shopsName = groups.map( (group) => {
    var obj: {[k: string]: any} = {};
    obj.groupId = group.id
    obj.shopId = group.shop.id
    obj.shopName = group.shop.name
    return obj
  })


  return (
    <div className="App">
        <div className="p-grid nested-grid">
          <div className="p-col-6">
            <div className="p-grid p-dir-col">
              <div className="p-col">
                
                <div className="card">
                    <h1> List </h1>
                    <ListBox value={selectedGroupId} options={shopsName} onChange={(e) => {
                      setSelectedGroupId(e.value.groupId);
                      nodeService.getGroupItems( e.value.groupId ).then( (data) => { setGroupItems(data)})
                      }} optionLabel="shopName" style={{ width: '15rem' }} />
                </div>
              </div>
              <div className="p-col">
                <div className="card">
                    <h5>Vertical</h5>
                    <DataTable value={groupItems} scrollable scrollHeight="200px" loading={loading}>
                        <Column field="name" header="Name"></Column>
                        <Column field="number" header="Number"></Column>
                        <Column field="price" header="Price"></Column>
                    </DataTable>
                </div>
              </div>
              <div className="p-col">3</div>
            </div>
          </div>
          <div className="p-col-6">
            <div className="p-grid p-dir-col">
              <div className="p-col">1</div>
              <div className="p-col">2</div>
              <div className="p-col">3</div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
