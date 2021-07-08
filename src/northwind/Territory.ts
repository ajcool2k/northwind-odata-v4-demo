/*
<EntityType Name="Territory">
  <Key>
    <PropertyRef Name="TerritoryID" />
  </Key>
  <Property Name="TerritoryID" Type="Edm.String" Nullable="false" />
  <Property Name="TerritoryDescription" Type="Edm.String" />
  <Property Name="RegionID" Type="Edm.Int32" />
  <NavigationProperty Name="Region" Type="kendo_northwind_pg.Models.Region">
    <ReferentialConstraint Property="RegionID" ReferencedProperty="RegionID" />
  </NavigationProperty>
  <NavigationProperty Name="Employees" Type="Collection(kendo_northwind_pg.Models.Employee)" />
</EntityType>
*/

import { Edm, ForeignKey, KeyProperty, ODataModel, ODataNavigation, Property, withEntitySetName } from '@odata/server';
import { Employee } from './Employee';
import { Region } from './Region';

@withEntitySetName('Territories')
@ODataModel({ name: 'Territories' })
export class Territory {

  @KeyProperty()
  @Edm.String
  TerritoryID: string;

  @Property()
  @Edm.String
  TerritoryDescription: string;

  @Property()
  @ForeignKey()
  @Edm.Int32
  RegionID: number;

  @ODataNavigation({ type: 'OneToOne', entity: () => Region, targetForeignKey: 'RegionID' })
  Region: Region[];

  @ODataNavigation({ type: 'OneToMany', entity: () => Employee, targetForeignKey: 'EmployeeID' })
  Employees: Employee[];
}
