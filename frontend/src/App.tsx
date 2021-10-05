import React, { useState, useEffect} from 'react';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primeflex/primeflex.css';
import { nodeServiceImplement } from './service/nodeService'
import { IGroup, IItem } from './types/objectTypes'
import { ListBox } from 'primereact/listbox';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {InputNumber} from 'primereact/inputnumber'
import {Button} from 'primereact/button';

function App() {
  
  let nodeService = new nodeServiceImplement ()

  const [selectedGroupId, setSelectedGroupId] = useState<string>("group1")
  const [groups, setGroups] = useState<Array<IGroup>>([])
  const [groupItems, setGroupItems] = useState<Array<IItem>>([])
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState<string>('name1');
  const [price, setPrice] = useState<number>(50);
  const [itemIndex, setItemIndex] = useState<number>(1)

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
              <div className="p-col">
              <h5>Inline</h5>
                    <div className="p-formgroup-inline">
                        <div className="p-field">
                            <InputText id="name" value={name} onChange={(e) => setName(e.target.value)}  placeholder="Name" />
                        </div>
                        <div className="p-field">
                            <InputNumber id="price" value={price} onChange={(e) => setPrice(e.value)}  placeholder="Price"/>
                        </div>
                        <Button type="button" label="Submit" onClick={ () => {
                            let newItem : IItem = {
                              id : `item${itemIndex}`,
                              groupId : "group1",
                              name : name,
                              number : 1,
                              price : price
                            }
                            setItemIndex(itemIndex+1)
                            nodeService.postItem(newItem).then( data => console.log(data))
                        }}/>
                        <Button type="button" label="query name1 group1" onClick={ () => {
                            let query = {
                              groupId : "group1"
                            }
                            nodeService.getItemQuery(query).then( data => {
                              // combine same name, summary the order number
                              type holder = {
                                [key: string]: number
                              }
                              var holderMap : holder = {}

                              data.forEach(function(d) {
                                console.log("d.name", d.name)
                                if (holderMap.hasOwnProperty(d.name)) {
                                  holderMap[d.name] = holderMap[d.name] + d.number;
                                } else {
                                  holderMap[d.name] = d.number;
                                }
                              });

                              var combinedOrderHistory = [];
                              for (var prop in holderMap) {
                                combinedOrderHistory.push({ name: prop, number: holderMap[prop] });
                              }

                              console.log("combinedOrderHistory", combinedOrderHistory);
                            })
                        }}/>
                        <Button type="button" label="query name2 group1" onClick={ () => {
                            let query = {
                              name : "name2",
                              groupId : "group1"
                            }
                            nodeService.getItemQuery(query)
                        }}/>
                    </div>
              </div>
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
