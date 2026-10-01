#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/6c248eb862920bd368e30385e7f941dc648cc856c6caba44585b401bb690add6/contract';
import endContract from '../../snapshots/6c248eb862920bd368e30385e7f941dc648cc856c6caba44585b401bb690add6/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'additional_project_aspects',
        columns: [
          col('aspect', 'character varying(255)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('project_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'dashboard_projects',
        columns: [
          col('description', 'character varying(255)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('favorite', 'bool', { codecRef: { codecId: 'pg/bool@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('name', 'character varying(255)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
        ],
        constraints: [primaryKey(['id'], { name: 'dashboard_projects_pkey' })],
      }),
      this.createTable({
        schema: 'public',
        table: 'dataotter_application_link',
        columns: [
          col('application_id', 'int8', { codecRef: { codecId: 'pg/int8@1' } }),
          col('project_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'github_project_links',
        columns: [
          col('github_project_id', 'int8', { codecRef: { codecId: 'pg/int8@1' } }),
          col('project_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'github_repository_links',
        columns: [
          col('github_repository_id', 'int8', { codecRef: { codecId: 'pg/int8@1' } }),
          col('project_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'maven_project_link',
        columns: [
          col('maven_url', 'character varying(255)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('project_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'additional_project_aspects',
        foreignKey: {
          name: 'fk60wy1ni71ddy0tl4sllg47ljh',
          columns: ['project_id'],
          references: { schema: 'public', table: 'dashboard_projects', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'dataotter_application_link',
        foreignKey: {
          name: 'fkmk4turc23fe3pvrk0vmc9ligi',
          columns: ['project_id'],
          references: { schema: 'public', table: 'dashboard_projects', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'github_project_links',
        foreignKey: {
          name: 'fk29na5lvj3s2nf61jdtf2a8sxs',
          columns: ['project_id'],
          references: { schema: 'public', table: 'dashboard_projects', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'github_repository_links',
        foreignKey: {
          name: 'fkn45dxtnp0paps1mofyflpu7ej',
          columns: ['project_id'],
          references: { schema: 'public', table: 'dashboard_projects', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'maven_project_link',
        foreignKey: {
          name: 'fkl1d5x2v3gmw43vpw1tepn2sjy',
          columns: ['project_id'],
          references: { schema: 'public', table: 'dashboard_projects', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
