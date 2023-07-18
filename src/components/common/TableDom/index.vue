<template>
  <div class="table_wrap">
    <div v-if="filterColumn" class="filter-column">
      <el-popover placement="bottom-end" width="150" trigger="click">
        <el-button
          slot="reference"
          class="filter-btn"
          size="mini"
          icon="el-icon-s-grid"
        ></el-button>
        <el-checkbox
          v-model="allColumnsSelected"
          :indeterminate="allColumnsSelectedIndeterminate"
          @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
        <el-checkbox
          v-for="(item, index) in checkColumn"
          :key="item.name"
          v-model="item.visible"
          @change="handleCheckedTableColumnsChange(item, index)"
        >
          {{ item.name }}
        </el-checkbox>
      </el-popover>
    </div>
    <el-table
      v-if="showTable"
      ref="multipleTable"
      v-loading="loading"
      size="mini"
      :data="data"
      :row-key="rowKey"
      tooltip-effect="dark"
      :height="height"
      border
      lazy
      :default-expand-all="defaultExpandAll"
      :span-method="spanMethod"
      :load="load"
      :tree-props="treeProps"
      :header-cell-style="getRowClass"
      :header-cell-class-name="select || radio ? cellClass : ''"
      :row-class-name="tableRowClassName"
      :default-sort="defaultSort"
      @select="selectChange"
      @selection-change="handleSelectionChange"
      @select-all="handleSelectAll"
      @filter-change="filterChange"
      @expand-change="expandChange"
      @sort-change="handleSort"
      @row-click="rowClick"
      @cell-click="cellClick"
      @row-dblclick="rowDblclick"
      @cell-dblclick="cellDblclick"
      @row-contextmenu="rowContextmenu"
      @header-contextmenu="headerContextmenu"
      @cell-mouse-enter="cellMouseEnter"
      @cell-mouse-leave="cellMouseLeave"
    >
      <template v-if="useColumn === 'useColumn'">
        <el-table-column
          v-if="selection"
          type="selection"
          :selectable="selectable"
          align="center"
          :reserve-selection="selection"
          :fixed="fixed.sort"
          :width="column.length > 0 ? 55 : 'auto'"
        ></el-table-column>
        <el-table-column
          v-if="sortIndex"
          type="index"
          label="序号"
          align="center"
          :fixed="fixed.sort"
          :width="column.length > 0 ? 55 : 'auto'"
        ></el-table-column>
        <template v-for="(item, index) in columnData">
          <template v-if="!item.hidden">
            <!-- 自定义序号位置 -->
            <el-table-column
              v-if="item.type === 'sortIndex'"
              :key="index"
              :type="item.index || 'index'"
              :label="item.label || '序号'"
              :align="item.align || 'center'"
              :fixed="item.sort"
            ></el-table-column>
            <!-- 可以触发点击事件 -->
            <el-table-column
              v-if="item.handle"
              :key="index"
              :index="index"
              :label="item.name"
              :prop="item.prop"
              :width="item.width"
              v-bind="item.attrs || {}"
              :sortable="item.sortable ? 'custom' : false"
              :show-overflow-tooltip="
                typeof item.tooltip === 'boolean'
                  ? item.tooltip
                  : item.tooltip || true
              "
              :align="item.align || 'left'"
            >
              <template slot-scope="scope">
                <a
                  v-if="item.class"
                  :class="item.class && item.class(scope.row)"
                  @click="item.handle(scope.row)"
                >
                  {{ scope | formateItem(item, defaultValue) }}
                </a>
                <a
                  v-else
                  style="color: #409eff"
                  @click="item.handle(scope.row)"
                >
                  {{ scope | formateItem(item, defaultValue) }}
                </a>
              </template>
            </el-table-column>
            <!-- 状态 icon -->
            <el-table-column
              v-else-if="item.type === 'statusIcon'"
              :key="index"
              :index="index"
              :label="item.name"
              :width="item.width"
              v-bind="item.attrs || {}"
              :show-overflow-tooltip="
                typeof item.tooltip === 'boolean'
                  ? item.tooltip
                  : item.tooltip || true
              "
              :sortable="item.sortable ? 'custom' : false"
              :align="item.align || 'center'"
            >
              <template slot-scope="scope">
                <i
                  :class="
                    `${item.statusProps[scope.row[item.prop]]} statusIcon`
                  "
                  :style="`color:${item.statusColors[scope.row[item.prop]]}`"
                >
                </i>
              </template>
            </el-table-column>
            <!-- switch选择 -->
            <el-table-column
              v-else-if="item.type === 'switch'"
              :key="index"
              :index="index"
              :label="item.name"
              :width="item.width"
              v-bind="item.attrs || {}"
              :sortable="item.sortable ? 'custom' : false"
              :show-overflow-tooltip="
                typeof item.tooltip === 'boolean'
                  ? item.tooltip
                  : item.tooltip || true
              "
              :align="item.align || 'center'"
            >
              <template slot-scope="scope">
                <el-switch
                  :disabled="item.disabled && item.disabled(scope.row)"
                  :value="scope.row[item.prop]"
                  :active-value="item.activeValue || '0'"
                  :inactive-value="item.inactiveValue || '1'"
                  :active-color="item.activeColor || '#409eff'"
                  :inactive-color="item.inactiveColor || '#dcdfe6'"
                  @change="item.change(scope.row)"
                >
                </el-switch>
                <!-- <el-switch
                v-else
                :disabled="item.disable"
                v-model="scope.row[item.prop]"
                :active-value="item.activeValue || '0'"
                :inactive-value="item.inactiveValue || '1'"
                :active-color="item.activeColor || '#409eff'"
                :inactive-color="item.inactiveColor || '#dcdfe6'"
              >
              </el-switch> -->
              </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column
              v-else-if="item.name === '操作'"
              :key="index"
              :index="index"
              :label="item.name"
              :prop="item.prop"
              :align="item.align || 'center'"
              :sortable="item.sortable ? 'custom' : false"
              :fixed="item.fixed"
              v-bind="item.attrs || {}"
              :width="
                item.width ||
                  (item.group.length === 1 ? '60' : item.group.length * 40)
              "
            >
              <template slot-scope="scope">
                <!-- dropdown 存在的情况 -->
                <template v-if="item.dropdown">
                  <!-- 默认不被dropdown的按钮 -->
                  <template
                    v-for="(_item, _index) in item.group.slice(
                      0,
                      item.dropdownNum || 4,
                    )"
                  >
                    <el-button
                      v-if="_item.type === 'file'"
                      :key="_index"
                      size="mini"
                      :type="(_item.type && _item.type(scope.row)) || 'text'"
                      :plain="_item.plain"
                      :title="
                        _item.permission &&
                          _item.permission(scope.row) &&
                          '当前禁止操作'
                      "
                      :disabled="
                        (_item.permission && _item.permission(scope.row)) ||
                          false
                      "
                    >
                      <upload-dom
                        :text="_item.name"
                        :type="(_item.type && _item.type(scope.row)) || 'text'"
                        :plain="_item.plain"
                        @upLoadRequest="file => _item.handle(file, scope.row)"
                      ></upload-dom>
                    </el-button>
                    <el-popover
                      v-else-if="
                        _item.name === '删除' && _item.type === 'popover'
                      "
                      :ref="scope.row[rowKey]"
                      :key="_index"
                      placement="top"
                      width="200"
                      style="margin-left: 10px"
                    >
                      <p>
                        <i class="el-icon-warning" style="color: #e6a23c"></i>
                        您确定要删除吗？
                      </p>
                      <div style="text-align: right; margin: 0">
                        <el-button
                          size="mini"
                          class="popover_btn"
                          @click="closePopover(scope.row)"
                        >
                          取 消
                        </el-button>
                        <el-button
                          type="primary"
                          size="mini"
                          class="popover_btn"
                          :loading="btn_loading"
                          @click="_item.handle(scope.row, closePopover)"
                        >
                          确 定
                        </el-button>
                      </div>
                      <el-button
                        slot="reference"
                        :title="
                          _item.permission &&
                            _item.permission(scope.row) &&
                            '当前禁止操作'
                        "
                        :disabled="
                          (_item.permission && _item.permission(scope.row)) ||
                            false
                        "
                        size="mini"
                        :type="
                          _item.type === 'popover' && _item.plain
                            ? 'danger'
                            : 'text'
                        "
                        :plain="_item.plain"
                      >
                        删除
                      </el-button>
                    </el-popover>
                    <el-button
                      v-else-if="
                        (_item.renderBtn && _item.renderBtn(scope.row)) ||
                          !_item.renderBtn
                      "
                      :key="_index"
                      size="mini"
                      :type="(_item.type && _item.type(scope.row)) || 'text'"
                      :plain="_item.plain"
                      :title="
                        _item.permission &&
                          _item.permission(scope.row) &&
                          '当前禁止操作'
                      "
                      :disabled="
                        (_item.permission && _item.permission(scope.row)) ||
                          false
                      "
                      @click="_item.handle(scope.row)"
                    >
                      {{
                        (_item.nameFn && _item.nameFn(scope.row)) || _item.name
                      }}
                    </el-button>
                  </template>
                  <!-- dropdown的按钮 -->
                  <template v-if="item.group.length > (item.dropdownNum || 4)">
                    <el-dropdown>
                      <el-button
                        size="mini"
                        :plain="item.dropdownPlain || 'plain'"
                        :type="item.dropdownType || 'success'"
                        style="margin-left: 10px"
                      >
                        {{ item.dropdownText || '更多'
                        }}<i class="el-icon-arrow-down el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <template
                          v-for="(_item, _index) in item.group.slice(
                            item.dropdownNum || 4,
                            item.group.length,
                          )"
                        >
                          <el-dropdown-item
                            v-if="
                              (_item.renderBtn && _item.renderBtn(scope.row)) ||
                                !_item.renderBtn
                            "
                            :key="_index"
                            :disabled="
                              (_item.permission &&
                                _item.permission(scope.row)) ||
                                false
                            "
                          >
                            <div
                              @click="_item.handle && _item.handle(scope.row)"
                            >
                              {{ _item.name }}
                            </div>
                          </el-dropdown-item>
                        </template>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </template>
                <template v-else>
                  <template v-for="(_item, _index) in item.group">
                    <!-- icon -->
                    <template v-if="_item.icon">
                      <el-button
                        v-if="
                          (_item.renderBtn && _item.renderBtn(scope.row)) ||
                            !_item.renderBtn
                        "
                        :key="_index"
                        class="table_btn_icon"
                        size="mini"
                        type="text"
                        :style="
                          _item.type === 'popover'
                            ? { marginLeft: 0 }
                            : { marginLeft: '10px' }
                        "
                        :title="
                          _item.permission &&
                            _item.permission(scope.row) &&
                            !_item.tooltipAttr &&
                            '当前禁止操作'
                        "
                        :disabled="
                          (_item.permission && _item.permission(scope.row)) ||
                            false
                        "
                        :loading="!!scope.row['loading_' + _index]"
                        @click="
                          _item.type === 'popover' || _item.handle(scope.row)
                        "
                      >
                        <template v-if="_item.type === 'popover'">
                          <el-popover
                            :ref="scope.row[rowKey]"
                            :key="_index"
                            placement="top"
                            width="200"
                            style="margin-left: 10px"
                          >
                            <p>
                              <i
                                class="el-icon-warning"
                                style="color: #e6a23c"
                              ></i>
                              您确定要删除吗？
                            </p>
                            <div style="text-align: right; margin: 0">
                              <el-button
                                size="mini"
                                class="popover_btn"
                                @click="closePopover(scope.row)"
                              >
                                取 消
                              </el-button>
                              <el-button
                                type="primary"
                                size="mini"
                                class="popover_btn"
                                :loading="btn_loading"
                                @click="_item.handle(scope.row, closePopover)"
                              >
                                确 定
                              </el-button>
                            </div>
                            <el-button
                              slot="reference"
                              style="margin-left: 0"
                              :title="
                                _item.permission &&
                                  _item.permission(scope.row) &&
                                  '当前禁止操作'
                              "
                              :disabled="
                                (_item.permission &&
                                  _item.permission(scope.row)) ||
                                  false
                              "
                              size="mini"
                              type="text"
                            >
                              <svg-icon
                                v-if="_item.iconType === 'svg'"
                                class="icon iconfont"
                                :class="_item.icon"
                                :icon-class="_item.icon"
                              ></svg-icon>
                              <i
                                v-else
                                class="icon iconfont"
                                :class="_item.icon"
                              ></i>
                            </el-button>
                          </el-popover>
                        </template>
                        <template v-else>
                          <el-tooltip
                            placement="top-start"
                            :disabled="!_item.tooltipAttr"
                            :content="
                              (_item.tooltipMessage &&
                                _item.tooltipMessage(scope.row)) ||
                                _item.name
                            "
                            v-bind="_item.tooltipAttr"
                          >
                            <template v-if="_item.tooltipAttr">
                              <svg-icon
                                v-if="_item.iconType === 'svg'"
                                class="icon iconfont"
                                :class="_item.icon"
                                :icon-class="_item.icon"
                              ></svg-icon>
                              <i
                                v-else
                                class="icon iconfont"
                                :class="_item.icon"
                              ></i>
                            </template>
                            <template v-else>
                              <i
                                v-if="_item.iconType === 'svg'"
                                :title="_item.name"
                              >
                                <svg-icon
                                  class="icon iconfont"
                                  :class="_item.icon"
                                  :icon-class="_item.icon"
                                ></svg-icon>
                              </i>
                              <i
                                v-else
                                class="icon iconfont"
                                :title="_item.name"
                                :class="_item.icon"
                              ></i>
                            </template>
                          </el-tooltip>
                        </template>
                      </el-button>
                    </template>
                    <!-- button -->
                    <template v-else>
                      <!-- 文件上传 -->
                      <el-button
                        v-if="_item.type === 'file'"
                        :key="_index"
                        size="mini"
                        :type="(_item.type && _item.type(scope.row)) || 'text'"
                        :plain="_item.plain"
                        :title="
                          _item.permission &&
                            _item.permission(scope.row) &&
                            '当前禁止操作'
                        "
                        :disabled="
                          (_item.permission && _item.permission(scope.row)) ||
                            false
                        "
                      >
                        <upload-dom
                          :text="_item.name"
                          :type="
                            (_item.type && _item.type(scope.row)) || 'text'
                          "
                          :plain="_item.plain"
                          @upLoadRequest="file => _item.handle(file, scope.row)"
                        ></upload-dom>
                      </el-button>
                      <!-- popover框 删除 -->
                      <el-popover
                        v-else-if="
                          _item.name === '删除' && _item.type === 'popover'
                        "
                        :ref="scope.row[rowKey]"
                        :key="_index"
                        placement="top"
                        width="200"
                        style="margin-left: 10px"
                      >
                        <p>
                          <i class="el-icon-warning" style="color: #e6a23c"></i>
                          您确定要删除吗？
                        </p>
                        <div style="text-align: right; margin: 0">
                          <el-button
                            size="mini"
                            class="popover_btn"
                            @click="closePopover(scope.row)"
                          >
                            取 消
                          </el-button>
                          <el-button
                            type="primary"
                            size="mini"
                            class="popover_btn"
                            :loading="btn_loading"
                            @click="_item.handle(scope.row, closePopover)"
                          >
                            确 定
                          </el-button>
                        </div>
                        <el-button
                          slot="reference"
                          :title="
                            _item.permission &&
                              _item.permission(scope.row) &&
                              '当前禁止操作'
                          "
                          :disabled="
                            (_item.permission && _item.permission(scope.row)) ||
                              false
                          "
                          size="mini"
                          :type="
                            _item.type === 'popover' && _item.plain
                              ? 'danger'
                              : 'text'
                          "
                          :plain="_item.plain"
                        >
                          删除
                        </el-button>
                      </el-popover>
                      <!-- 外部通过renderBtn控制按钮是否存在 -->
                      <el-button
                        v-else-if="
                          (_item.renderBtn && _item.renderBtn(scope.row)) ||
                            !_item.renderBtn
                        "
                        :key="_index"
                        size="mini"
                        :type="(_item.type && _item.type(scope.row)) || 'text'"
                        :plain="_item.plain"
                        :title="
                          _item.permission &&
                            _item.permission(scope.row) &&
                            '当前禁止操作'
                        "
                        :disabled="
                          (_item.permission && _item.permission(scope.row)) ||
                            false
                        "
                        :loading="!!scope.row['loading_' + _index]"
                        @click="_item.handle(scope.row)"
                      >
                        {{
                          (_item.nameFn && _item.nameFn(scope.row)) ||
                            _item.name
                        }}
                      </el-button>
                    </template>
                  </template>
                </template>
              </template>
            </el-table-column>
            <!-- 自定义 -->
            <el-table-column
              v-else-if="item.type === 'slot'"
              :key="index"
              :index="index"
              :label="item.name"
              :prop="item.prop"
              :width="item.width"
              v-bind="item.attrs || {}"
              :sortable="item.sortable ? 'custom' : false"
              :show-overflow-tooltip="
                typeof item.tooltip === 'boolean'
                  ? item.tooltip
                  : item.tooltip || true
              "
              :align="item.align || 'center'"
            >
              <!-- 自定义header 内部提示 -->
              <!--
              <a slot="xxx_header" slot-scope="props">
               编码
              <i
                style="color: #2663ff"
                class="el-icon-question"
                @click="labelIcon(props.scope)"
              ></i>
              </a>
            -->
              <template v-if="item.slot_header" slot="header">
                <slot :name="`${item.prop}_header`" :scope="item">
                  <a>
                    {{ item.name }}
                    <joyadataTips :tooltip="true" :item="item.labelTip" />
                  </a>
                </slot>
              </template>
              <template slot-scope="scope">
                <!--
              render: (h) => {
                return  h('i', 'message', {
                  props: {
                    ....
                  }
                })
              }
             -->
                <ex-slot
                  v-if="item.render"
                  :render="item.render"
                  :column="item"
                  :row="scope.row"
                  :index="scope.$index"
                />
                <!--
                <template slot="siteRef" slot-scope="{ scope }">
                  <el-input size="mini" v-model="scope.row.site"></el-input>
                </template>
               -->
                <slot
                  v-else-if="item.slot_name"
                  :name="item.slot_name"
                  :scope="scope"
                ></slot>
                <div
                  v-else
                  style="display: inline"
                  :class="item.class && item.class(scope.row)"
                >
                  {{ scope | formateItem(item, defaultValue) }}
                </div>
              </template>
              <!-- 自定义内容 -->

              <!-- <template v-else slot-scope="scope">

            </template> -->
            </el-table-column>
            <!-- type:time 默认调用filter处理时间 -->
            <el-table-column
              v-else-if="item.type === 'time'"
              :key="index"
              :index="index"
              :label="item.name"
              :prop="item.prop"
              :width="item.width || '150px'"
              v-bind="item.attrs || {}"
              :show-overflow-tooltip="
                typeof item.tooltip === 'boolean'
                  ? item.tooltip
                  : item.tooltip || true
              "
              :sortable="item.sortable ? 'custom' : false"
              :align="item.align || 'center'"
            >
              <template slot-scope="scope">
                <div
                  style="display: inline"
                  :class="item.class && item.class(scope.row)"
                >
                  {{ scope.row[item.prop] | filterTime }}
                </div>
              </template>
            </el-table-column>
            <!-- 扩展性的 -->
            <!-- table 嵌套表格
            <template slot="expand_expand" slot-scope="scope">
              <div class="table_in_wrap">
                <joyadata-table
                  :ref="'table_dom' + scope.scope.id"
                  :selection="false"
                  :sort-index="false"
                  :url="fileUrl"
                  :column="detailColumn"
                  height="200px"
                  :init-pager="setting.initPage"
                  sort-by="createTime_desc"
                  :expand-change="expandChange"
                  :pagination="false"
                >
                </joyadata-table>
              </div>
             </template>
           -->
            <el-table-column
              v-else-if="item.type === 'expand'"
              :key="index"
              :index="index"
              type="expand"
            >
              <template slot-scope="props">
                <slot :name="`${item.prop}_expand`" :scope="props.row"></slot>
                <!--  -->
              </template>
            </el-table-column>
            <!-- 普通的column -->
            <el-table-column
              v-else-if="!item.hidden"
              :key="index"
              :index="index"
              :label="item.name"
              :prop="item.prop"
              :width="item.width"
              :show-overflow-tooltip="
                typeof item.tooltip === 'boolean'
                  ? item.tooltip
                  : item.tooltip || true
              "
              :align="item.align || 'left'"
              :sortable="item.sortable ? 'custom' : false"
              v-bind="item.attrs || {}"
              :filtered-value="
                (item.filteredValue && item.filteredValue(item)) || []
              "
            >
              <template slot-scope="scope">
                <div
                  style="display: inline"
                  :class="item.class && item.class(scope.row)"
                >
                  {{ scope | formateItem(item, defaultValue) }}
                </div>
              </template>
            </el-table-column>
          </template>
        </template>
      </template>
      <template v-else>
        <!-- 完全动态生成 -->
        <column :column="column" />
        <!-- <el-table-column
          v-for="(item, index) in column"
          :key="index"
          align="center"
          :label="item.name"
        >
          <el-table-column
            v-for="(_item, _index) in item.children"
            :key="_index"
            align="center"
            :width="_item.name.length < 4 ? '60' : 18 * _item.name.length"
            :prop="_item.name"
            :show-overflow-tooltip="true"
            :label="_item.name"
          ></el-table-column>
        </el-table-column> -->
      </template>
    </el-table>
    <template v-else>
      <template v-if="data.length > 0">
        <div id="slotDom_main" v-loading="loading">
          <slot name="slotMain" :data="data"></slot>
        </div>
      </template>
      <template v-else>
        <div v-if="isEmpty" class="empty_wrap">
          <span class="empty_text">暂无数据</span>
        </div>
        <slot v-else name="slotEmpty"></slot>
      </template>
    </template>

    <!-- 分页 -->
    <div v-if="pagination && type === 'page'" class="page_right">
      <el-pagination
        :page-size="Number(query.pageSize || query.pager)"
        :current-page="queryPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="sizeChange"
        @current-change="pageChange"
      ></el-pagination>
    </div>
    <!-- 弹框的分页处理 -->
    <div v-if="pagination && type === 'dialog'" class="page_center">
      <el-pagination
        :page-size="size"
        :current-page="page + 1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="sizeChange"
        @current-change="pageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import initData from 'joyadata-coms/src/lib/initData';
import {
  parseTime,
  isObject,
  debounce,
  formateTable,
} from 'joyadata-coms/src/utils/index';
import joyadataTips from 'joyadata-coms/src/components/joyadataTips';
import Column from 'joyadata-coms/src/components/TableDom/column.vue';
import exSlot from 'joyadata-coms/src/components/TableDom/exSlot';
const columnSession = 'COLUMNSECTION';
// 防抖函数
let debounceFn = '';
export default {
  name: 'JoyadataTable',
  components: {
    Column,
    exSlot,
    joyadataTips,
  },
  filters: {
    filterTime(val) {
      if (!val) return '-';
      return parseTime(val);
    },
    formateItem(scope, item, defaultValue) {
      const val = scope.row;
      if (isObject(val[item.prop])) {
        return item.formate
          ? item.formate(val, item, scope)
          : formateTable(val[item.prop][item.inKey], defaultValue);
      } else {
        return item.formate
          ? item.formate(val, item, scope)
          : formateTable(val[item.prop], defaultValue);
      }
    },
    currenPage(val) {
      return val;
    },
  },
  mixins: [initData],
  props: {
    // 冻结
    fixed: {
      type: Object,
      default: () => {
        return {
          sort: false,
          select: false,
        };
      },
    },
    // 表格关键字id
    rowKey: {
      type: String,
      default: 'id',
    },
    // 是否支持选择完，分页，选择依旧存在
    select: {
      type: Boolean,
      default: false,
    },
    // 选中分页，调用选中再次选中延迟时间
    selectDelayTime: {
      type: Number,
      default: 300,
    },
    // 支持单选
    radio: {
      type: Boolean,
      default: false,
    },
    // tree性的结构
    treeProps: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          hasChildren: 'hasChildren',
        };
      },
    },
    // 模拟数据
    mockData: {
      type: Array,
      default: () => [],
    },
    // table 模式
    type: {
      type: String,
      default: 'page',
    },
    // 搜索的关键字
    searchBy: {
      type: String,
      default: '',
    },
    // 排序的关键字
    sortBy: {
      type: String,
      default: '',
    },
    /**
     * 如果传customPage: true；则使用pageNum，pageSize，搜索值为blurry
     */
    paramkeys: {
      type: Object,
      default: () => ({}),
    },
    // 是否支持selection
    selection: {
      type: Boolean,
      default: true,
    },
    // 排序字段
    sortIndex: {
      type: Boolean,
      default: true,
    },
    // 表高
    height: {
      type: String,
      default: 'auto',
    },
    // 获取数据url
    url: {
      type: String,
      default: '',
    },
    // 表头
    column: {
      type: Array,
      default: () => [],
    },
    // 是否分页
    pagination: {
      type: Boolean,
      default: true,
    },
    // class 切换
    tableRowClassName: {
      type: Function,
      default: () => () => {},
    },
    // 计算 pager
    calcHeight: {
      type: Number,
      default: 220,
    },
    // 判断是否需要内部的column；
    useColumn: {
      type: String,
      default: 'useColumn',
    },
    // 全部展开
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    // checkBox 是否禁用，true不禁用，false 禁用！
    selectable: {
      type: Function,
      default: () => {
        return true;
      },
    },
    // 适用于table组件自动销毁
    showTable: {
      type: Boolean,
      default: true,
    },
    // 每页展示多少条
    initPager: {
      type: Number,
      default: 0,
    },
    // 默认当前页
    initPage: {
      type: Number,
      default: 0,
    },
    // 默认default-value
    defaultValue: {
      type: String,
      default: '-',
    },
    /**
     * 默认排序
     */
    // defaultSort: {
    //   type: Object,
    //   default: () => {
    //     return {};
    //     // return { prop: 'name', order: 'ascending' };
    //   },
    // },
    /**
     * expand
     */
    expandChange: {
      type: Function,
      default: () => {},
    },
    /**
     * table 合并
     */
    spanMethod: {
      type: Function,
      // eslint-disable-next-line no-unused-vars
      default: ({ row, column, rowIndex, columnIndex }) => {
        return false;
        /**
         * 通过给table传入span-method方法可以实现合并行或列，方法的参数是一个对象，
         * 里面包含当前行row、当前列column、当前行号rowIndex、当前列号columnIndex四个属性。该函数可以返回一个包含两个元素的数组，
         * 第一个元素代表rowspan，第二个元素代表colspan。 也可以返回一个键名为rowspan和colspan的对象。
         */
        // if (rowIndex % 2 === 0) {
        //   if (columnIndex === 0) {
        //     return [1, 2];
        //   } else if (columnIndex === 1) {
        //     return [0, 0];
        //   }
        // }
        // if (columnIndex === 0) {
        //   if (rowIndex % 2 === 0) {
        //     return {
        //       rowspan: 2,
        //       colspan: 1,
        //     };
        //   } else {
        //     return {
        //       rowspan: 0,
        //       colspan: 0,
        //     };
        //   }
        // }
      },
    },
    /**
     * 过滤colunm
     */
    filterColumn: {
      type: Boolean,
      default: false,
    },
    /**
     * 本地存储filterColumn
     */
    columnSession: {
      type: Boolean,
      default: false,
    },
    /**
     * mergeParams
     * true 浏览器url覆盖parmas
     * false 不做任何处理
     */
    mergeParams: {
      type: Boolean,
      default: false,
    },
    /**
     * 自定义时的empty
     */
    isEmpty: {
      type: Boolean,
      default: true,
    },
    /**
     * 开启全选
     */
    allCheck: {
      type: Boolean,
      default: false,
    },
    /**
     * 获取完数据，就初始化数据
     * false，可以搭配 afterData ，处理数据再赋值
     * data为自行处理的值
     * this.$set(this.$refs['table_dom'], 'data', data);
     */
    initData: {
      type: Boolean,
      default: true,
    },
    fixedPager: {
      type: Number,
      default: 0,
    },
    sortAuto: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // attrs: {
      //   filters: [
      //     { text: '家', value: '01' },
      //     { text: '公司', value: '02' },
      //   ],
      //   columnKey: 'description',
      //   filterPlacement: 'bottom-end',
      // },
      allColumnsSelected: true,
      allColumnsSelectedIndeterminate: false,
      visible: false,
      btn_loading: false,
      data: [],
      queryPage: 0,
      selectData: [],
      // dialog 动态传递的检索条件
      search: {},
      checkColumn: [],
      doColumn: [{}],
      order: null,
    };
  },
  computed: {
    columnData() {
      let data = this.checkColumn.filter(item => item.visible);
      if (this.doColumn[0].name === '操作') {
        data = data.concat(this.doColumn);
      }
      return data;
    },
    defaultSort() {
      return this.defaultOrderSort;
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    '$route.query'({ pager }) {
      if (this.type === 'page') {
        // this.initURL();
        debounceFn();
      }
      // if (pager) {
      //   // this.$set(this.column[1], 'filteredValue', [...name.split(',')]);
      // } else {
      //   this.column = [];
      //   this.column = await this.formateDictColumn(
      //     menuConfig.column(this, system),
      //     'Menu',
      //   );
      // }
    },
    url(val) {
      if (this.type !== 'page') {
        this.page = 0;
        this.blurry = '';
        // eslint-disable-next-line no-console
        val && this.init();
      } else {
        // this.initURL();
        val && debounceFn();
      }
    },
    mockData(data) {
      this.data = data;
    },
    column() {
      this.formateColumn();
    },
  },
  beforeCreate() {
    /**
     * 默认选中排序
     */
    if (this.$route.query && this.$route.query.sortby) {
      const { sortby } = this.$route.query;
      const prop = sortby.split('_')[0];
      const order =
        sortby.split('_')[1] === 'desc' ? 'descending' : 'ascending';
      this.defaultOrderSort = {
        prop,
        order,
      };
    }
  },
  mounted() {
    /**
     * 处理column
     */
    this.formateColumn();
    // console.log(this.checkColumn);
    // 防止多次触发
    debounceFn = debounce(this.initURL, 10);
    // 便于开发mock数据
    if (this.mockData.length > 0) {
      this.data = this.mockData;
      return false;
    }
    // 没有地址不请求
    if (this.url === '') return false;
    // page
    if (this.type === 'page') {
      if (this.$route.query) {
        // this.initURL();
        debounceFn();
      }
      // dialog
    } else {
      this.init();
    }
  },
  destroyed() {
    window.sessionStorage.setItem(columnSession, '');
  },

  methods: {
    formateColumn() {
      let column = [];
      const _column = this.columnSession
        ? window.sessionStorage.getItem(columnSession)
        : false;
      this.doColumn = (this.column.length > 0 && this.column.slice(-1)) || [{}];
      /**
       * 当前页面，本地存储
       */
      if (_column) {
        column = JSON.parse(_column);
      } else {
        /**
         * 默认进来
         */
        if (this.doColumn[0].name === '操作') {
          // 存在操作按钮
          column = this.column
            .filter(item => item.name !== '操作')
            .map(item => {
              this.$set(item, 'visible', true);
              return item;
            });
        } else {
          column = this.column.map(item => {
            this.$set(item, 'visible', true);
            return item;
          });
        }
      }
      this.checkColumn = column;
    },
    beforeInit() {
      this.methods = 'get';
      // eslint-disable-next-line no-console
      if (this.type === 'page') {
        this.params = {
          ...this.query,
          sortby: this.order || this.query.sortby || undefined,
        };
      } else {
        // eslint-disable-next-line no-console
        // customPage: true；则使用pageNum，pageSize，搜索值为blurry
        this.params = {
          page: this.page,
          pager: this.size,
          sortby: this.order || this.sortBy || undefined,
          searchby: this.searchBy || undefined,
          keywords: this.blurry,
          ...this.search,
        };
      }

      return true;
    },
    getRowClass({ rowIndex }) {
      if (rowIndex === 0) {
        return 'color: #000;background:#f5f8fd;border-bottom:none;';
      } else {
        return '';
      }
    },
    searchFn(val) {
      if (this.type === 'dialog') {
        this.blurry = val;
        this.page = 0;
        this.init();
      }
    },
    closePopover(val) {
      // eslint-disable-next-line no-console
      // console.log(this.$refs[val.id]);
      if (Array.isArray(this.$refs[val[this.rowKey]])) {
        this.$refs[val[this.rowKey]].map(item => item.doClose());
      } else {
        this.$refs[val[this.rowKey]].doClose();
      }
    },
    load(tree, treeNode, resolve) {
      this.$emit('chidrenLoad', { tree, treeNode, resolve });
    },
    radioSelection(selection, row) {
      // this.radioSelectData = row;
      this.selectData = [row];
      this.$refs['multipleTable'] &&
        this.$refs['multipleTable'].clearSelection();
      this.$refs['multipleTable'] &&
        this.$refs['multipleTable'].toggleRowSelection(row, true);
      this.$emit('selectData', this.selectData);
    },
    changeCron(val) {
      // eslint-disable-next-line no-console
      console.log(val);
    },
    toggleSelection() {
      this.$refs['multipleTable'] &&
        this.$refs['multipleTable'].clearSelection();
      this.$nextTick(() => {
        const ids = this.selectData.map(item => item[this.rowKey]);
        const rows = this.data.filter(
          item => ids.indexOf(item[this.rowKey]) !== -1,
        );
        if (rows.length > 0) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable && this.$refs.multipleTable.clearSelection();
        }
      });
    },
    /**
     * 单个选择数据，外部获取使用内部的selectData字段！
     */
    selectChange(selection, row) {
      if (this.radio) {
        this.radioSelection(selection, row);
      } else {
        selection = row;
        const arr = this.selectData;
        const ids = arr.map(item => item[this.rowKey]);
        if (ids.includes(row[this.rowKey])) {
          arr.splice(ids.indexOf(row[this.rowKey]), 1);
        } else {
          arr.push(row);
        }
        this.selectData = arr;
        this.$emit('selectData', this.selectData);
      }
    },
    cellClass(row) {
      if (row.columnIndex === 0) {
        return this.allCheck || 'disabledCheck';
      }
    },
    // 选择函数
    handleSelectionChange(row) {
      // 不需要分页，显示选择状态，选中的值直接抛出
      // if (!this.select) {
      this.$emit('selectionChange', row);
      //   this.selectData = row;
      // }
    },
    handleSelectAll(row) {
      if (row.length === 0) {
        this.selectData = this.formateAllSelect();
        return false;
      } else {
        const selectData = this.formateAllSelect();
        this.selectData = [...selectData, ...row];
      }
    },
    // 处理全选
    formateAllSelect() {
      const selectData = [...this.selectData];
      const unSelectId = this.data.map(item => item[[this.rowKey]]);
      for (let index = 0; index < this.selectData.length; index++) {
        const ele = this.selectData[index];
        if (unSelectId.includes(ele[this.rowKey])) {
          const _index = selectData
            .map(_item => _item[this.rowKey])
            .indexOf(ele[this.rowKey]);
          selectData.splice(_index, 1);
        }
      }
      return selectData;
    },
    // sortby
    handleSort(sort) {
      if (this.sortAuto) {
        if (sort.order) {
          let order = '';
          if (sort.order === 'descending') {
            order = `${sort.prop}_desc`;
          } else {
            order = `${sort.prop}_asc`;
          }
          this.order = order;
          this.$router.push({
            path: this.$route.path,
            query: {
              ...this.$route.query,
              sortby: order,
            },
          });
        }
      } else {
        this.$emit('sortHandle', sort);
      }
    },
    // 行点击
    rowClick(row, column, event) {
      this.$emit('rowClick', { row, column, event });
    },
    // 列点击
    cellClick(row, column, cell, event) {
      this.$emit('cellClick', { row, column, cell, event });
    },
    rowDblclick(row, column, event) {
      this.$emit('rowDblclick', { row, column, event });
    },
    cellDblclick(row, column, cell, event) {
      this.$emit('cellDblclick', { row, column, cell, event });
    },
    rowContextmenu(row, column, event) {
      this.$emit('rowContextmenu', { row, column, event });
    },
    headerContextmenu(column, event) {
      this.$emit('headerContextmenu', { column, event });
    },
    cellMouseEnter(row, column, cell, event) {
      this.$emit('cellMouseEnter', { row, column, cell, event });
    },
    cellMouseLeave(row, column, cell, event) {
      this.$emit('cellMouseLeave', { row, column, cell, event });
    },
    // url初始化选择
    initURL() {
      this.query = { ...this.$route.query };
      let tableHeight = 41;
      const table_wrap_height = document.body.offsetHeight - this.calcHeight;
      if (
        this.column &&
        this.column[this.column.length - 1] &&
        this.column[this.column.length - 1].name !== '操作'
      ) {
        tableHeight = 38;
      }
      // console.log(document.body.offsetHeight, this.calcHeight);
      const initPager = this.initPager
        ? this.initPager
        : parseInt(table_wrap_height / tableHeight) - 2 - this.fixedPager;
      let initPage = {};
      // customPage: true；则使用pageNum，pageSize，搜索值为blurry
      if (this.paramkeys.customPage) {
        initPage = {
          pageNum: this.initPage || 0,
          pageSize: initPager,
          searchby: this.query.searchby || this.searchBy || undefined,
          sortby: this.sortBy || undefined,
          ...this.paramkeys,
        };
      } else {
        initPage = {
          page: this.initPage || 0,
          pager: initPager,
          searchby: this.query.searchby || this.searchBy || undefined,
          sortby: this.sortBy || undefined,
          ...this.paramkeys,
        };
      }
      if (this.paramkeys.customPage) {
        if (this.query.pageSize) {
          this.init();
        } else {
          this.$refs['multipleTable'] &&
            this.$refs['multipleTable'].clearFilter();
          this.$refs['multipleTable'] &&
            this.$refs['multipleTable'].clearSort();
          this.selectData = [];
          const obj = Object.assign(this.query, initPage);
          this.$router.push({
            path: this.$route.path,
            query: obj,
          });
        }
      } else {
        if (this.query.pager) {
          this.init();
        } else {
          this.$refs['multipleTable'] &&
            this.$refs['multipleTable'].clearFilter();
          this.$refs['multipleTable'] &&
            this.$refs['multipleTable'].clearSort();
          this.selectData = [];
          const obj = Object.assign(this.query, initPage);
          this.$router.push({
            path: this.$route.path,
            query: obj,
          });
        }
      }
    },
    filterChange(val) {
      // console.log(val);
      // const key = Object.keys(row)[0];
      // this.$router.push({
      //   query: {
      //     ...this.$route.query,
      //     [key]: Object.values(row).join(','),
      //   },
      // });
      this.$emit('filterChange', val);
    },

    labelIcon(item) {
      if (item.notifyFn) {
        item.notifyFn(item);
      } else {
        const notify = item.notify || {};
        this.$notify.info({
          // iconClass: 'el-icon-question',
          title: notify.title || '默认标题',
          dangerouslyUseHTMLString: true,
          iconClass: item.tipsIcon || 'el-icon-question',
          customClass: 'info_tips',
          message: notify.message || '这是个提示',
        });
      }
    },
    afterData(res) {
      this.$emit('afterData', res);
    },
    handleCheckAllChange(val) {
      if (val === false) {
        this.allColumnsSelected = true;
        return;
      }
      this.checkColumn.forEach(column => {
        if (!column.visible) {
          column.visible = true;
          this.updateColumnVisible(column);
        }
      });
      this.allColumnsSelected = val;
      this.allColumnsSelectedIndeterminate = false;
    },
    // eslint-disable-next-line no-unused-vars
    handleCheckedTableColumnsChange(item, index) {
      // console.log(item);
      // this.selfColumn = item;
      let totalCount = 0;
      let selectedCount = 0;
      this.checkColumn.forEach(column => {
        ++totalCount;
        selectedCount += column.visible ? 1 : 0;
      });
      if (selectedCount === 0) {
        this.$message.warning('请至少选择一列');
        this.$nextTick(function() {
          item.visible = true;
        });
        return;
      }
      this.allColumnsSelected = selectedCount === totalCount;
      this.allColumnsSelectedIndeterminate =
        selectedCount !== totalCount && selectedCount !== 0;
      this.updateColumnVisible(item);
    },
    updateColumnVisible(item) {
      // const table = this.crud.props.table;
      // const vm = table.$children.find(e => e.prop === item.property);
      // const columnConfig = vm.columnConfig;
      this.checkColumn = this.checkColumn.map(_item => {
        if (item.prop === _item.prop) {
          _item.visible = item.visible;
        }
        return _item;
      });
      window.sessionStorage.setItem(
        columnSession,
        JSON.stringify(this.checkColumn),
      );
      this.ignoreNextTableColumnsChange = true;
    },
    tableResize() {
      this.$nextTick(() => {
        setTimeout(() => {
          const wapper = window.document.getElementsByClassName(
            'el-table__body-wrapper',
          );
          wapper[0].style.height = 'auto';
        }, 300);
      });
    },
  },
};
</script>

<style lang="scss">
.table_wrap .el-table .active {
  background: rgba(0, 128, 0, 0.2);
  color: #fff;
}
.el-button.table_btn_icon {
  padding: 0;
  border: none;
}
.el-button.table_btn_icon.is-plain:hover,
.el-button.table_btn_icon.is-plain:focus {
  color: initial;
}
.table_wrap .el-table .el-table__row.active.hover-row > td {
  background: lightgreen;
  color: #fff;
}
.el-table .el-upload:focus {
  color: #409eff;
}
.el-table .el-table__column-filter-trigger {
  line-height: inherit;
}
/* 去掉全选按钮 */
.el-table .disabledCheck .cell .el-checkbox__inner {
  display: none !important;
}
/* /deep/.el-table {
  .el-table thead.is-group th{
    border-top: 1px solid #e4e7ed;
  }
} */
.el-table thead tr {
  &:nth-of-type(2) {
    th {
      border-top: 1px solid #e4e7ed;
    }
  }
}
/* statusIcon  */
.statusIcon {
  font-weight: 700;
  font-size: 20px;
  position: relative;
  top: 4px;
}
.el-table .disabledCheck .cell::before {
  content: '选择';
  text-align: center;
  line-height: 37px;
}
.popover_btn {
  padding: 4px 10px;
}
.filter-column {
  overflow: hidden;
  margin-bottom: 10px;
  .filter-btn {
    float: right;
  }
}
.empty_wrap {
  min-height: 450px;
  position: relative;
  .empty_text {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 12px;
    transform: translate3d(-50%, -50%, 0);
    color: #909399;
  }
}
.table_tag_success {
  color: #4ecc50;
  background-color: #f0fcf0;
  border: 1px solid #4ecc50;
  border-radius: 4px;
}
.table_tag_danger {
  padding: 3px 10px;
  color: #fd676a;
  background-color: #fcf2f3;
  border: 1px solid #fd5155;
  border-radius: 4px;
}
.table_tag_warning {
  padding: 3px 10px;
  color: #ff9100;
  background-color: #fff6eb;
  border: 1px solid #ffaa00;
  border-radius: 4px;
}
.table_tag_brand {
  padding: 3px 10px;
  color: #335cff;
  background-color: #f2f6ff;
  border: 1px solid #335cff;
  border-radius: 4px;
}
.table_tag_grey {
  padding: 3px 10px;
  color: #b2b2b2;
  background-color: #fafafa;
  border: 1px solid #b2b2b2;
  border-radius: 4px;
}
.table_text_success {
  color: #4ecc50;
}
.table_text_danger {
  color: #fd676a;
}
.table_text_warning {
  color: #ff9100;
}
.table_text_brand {
  color: #335cff;
}
.table_tag_grey {
  color: #b2b2b2;
}
</style>
